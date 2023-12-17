"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
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
  notifications: [];
  uiState: UIState;
  setSuccess: (value: string) => void;
  setError: (value: string) => void;
  setLoading: (value: boolean) => void;
  resetUiState: () => void;
}>({
  socket: null,
  notifications: [],
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
  const [notifications, setNotifications] = useState<any>([]);
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
    if (session) {
      const token = session.token;
      if (!session) return;
      if (socket) return;
      const newSocket = new ReconnectingWebSocket(
        `${SOCKET_URL}/api/v1/ws?token=${token}`,
        [],
        {
          debug: true,
          connectionTimeout: 3000,
          maxRetries: 5,
        }
      );
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [session]);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (messageEvent) => {
      const data: any = JSON.parse(messageEvent.data);
      switch (data.action) {
        case "notification":
          setNotifications(data.data);
          break;
        case "a_new_notification":
          setNotifications((prevState: any) => [...prevState, data.data]);
          break;
        case "unauthorized":
          socket.close();
          signOut();
          break;
        default:
          break;
      }
    };
  }, [socket]);

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
        notifications,
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
