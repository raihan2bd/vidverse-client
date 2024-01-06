"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
  useRef,
} from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useSession, signOut } from "next-auth/react";

type UIState = {
  success: boolean;
  error: boolean;
  message: string | null;
  loading: boolean;
};

const WebSocketContext = createContext<{
  socket: ReconnectingWebSocket | null;
  totalNotification: null | number;
  newNotification: null | NotificationType;
  uiState: UIState;
  setSuccess: (value: string) => void;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
  resetUiState: () => void;
}>({
  socket: null,
  totalNotification: null,
  newNotification: null,
  uiState: { success: false, error: false, message: null, loading: false },
  setSuccess: () => {},
  setError: () => {},
  setLoading: () => {},
  resetUiState: () => {},
});

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_API;

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = React.useState<ReconnectingWebSocket | null>(
    null
    );
  const socketRef = useRef<ReconnectingWebSocket | null>(null);
  const [totalNotification, setTotalNotification] = useState<null | number>(null)
  const [newNotification, setNewNotification] = useState<null | NotificationType>(null)
  const [uiState, setUiState] = useState<UIState>({
    success: false,
    error: false,
    message: null,
    loading: false,
  });

  const setSuccess = useCallback(
    (value: string = "Operation is successful") =>
      setUiState((state) => ({
        ...state,
        success: true,
        error: false,
        loading: false,
        message: value,
      })),
    []
  );

  const setError = useCallback(
    (value: string = "Something went wrong. please try again!") =>
      setUiState((state) => ({
        ...state,
        error: true,
        success: false,
        loading: false,
        message: value,
      })),
    []
  );

  const setLoading = useCallback(
    (value: boolean) =>
      setUiState((state) => ({
        ...state,
        loading: value,
        success: false,
        error: false,
        message: null,
      })),
    []
  );

  const resetUiState = useCallback(
    () =>
      setUiState({
        success: false,
        error: false,
        message: null,
        loading: false,
      }),
    []
  );

  const { data: session } = useSession();


  useEffect(() => {
    if (session && !socketRef.current) {
      const token = session.token;
      const newSocket = new ReconnectingWebSocket(
        `ws://${SOCKET_URL}/api/v1/ws?token=${token}`,
        [],
        {
          debug: true,
          maxRetries: 5,
        }
        );
        socketRef.current = newSocket;
      setSocket(newSocket);
    }
  }, [session]);

  useEffect(() => {
    if (!socketRef.current) return;
    socketRef.current.onmessage = (messageEvent) => {
      const data: any = JSON.parse(messageEvent.data);
      if (socketRef.current) {
        switch (data.action) {
          case "notifications":
            const count = !isNaN(data.data) ? data.data : 0
            setTotalNotification(data.data)
            break;
          case "a_new_notification":
            setTotalNotification((prev) => prev ? prev + 1 : 1)
            setNewNotification(data.data)
            break;
          case "unauthorized":
            socketRef.current.close();
            signOut();
            break;
          default:
            break;
        }
      }
    };

    if (typeof window !== "undefined") {
      window.onbeforeunload = function () {
        if (!socketRef.current) return
        const wsPayload = {
          action: "close",
        };
        socketRef.current.send(JSON.stringify(wsPayload));
      };
    };

    socketRef.current.onclose = () => {
      setSocket(null);
      socketRef.current = null;
      if (!totalNotification ) {
        setTotalNotification(0)
      }
    }

    socketRef.current.onerror = (error) => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      setSocket(null);
      socketRef.current = null;
      if (!totalNotification ) {
        setTotalNotification(0)
      }
    };

  }, [socketRef.current]);

  useEffect(() => {
    if (uiState.success || uiState.error) {
      const resetUI = setTimeout(() => {
        resetUiState();
      }, 3000);
      return () => clearTimeout(resetUI);
    }
  }, [uiState.success, uiState.error]);

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        totalNotification,
        newNotification,
        uiState,
        setSuccess,
        setError,
        setLoading,
        resetUiState,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(WebSocketContext);
};
