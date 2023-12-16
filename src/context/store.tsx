"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { useSession, signOut } from 'next-auth/react'

const WebSocketContext = createContext<{ socket: ReconnectingWebSocket | null, notifications: [],}>(
  { socket: null, notifications: [] }
);

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_API;

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  
  const [socket, setSocket] = React.useState<ReconnectingWebSocket | null>(null);
  const [notifications, setNotifications] = useState<any>([]);

  const {data: session } = useSession();

  useEffect(() => {
    if (session) {
      const token = session.token;
      if (!session) return;
      if (socket) return;
      const newSocket = new ReconnectingWebSocket(`${SOCKET_URL}/api/v1/ws?token=${token}`, [], {
        debug: true,
        connectionTimeout: 3000,
        maxRetries: 5,
      });
      setSocket(newSocket);

      return () => newSocket.close();
    }
  }, [session])

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (messageEvent) => {
      const data: any = JSON.parse(messageEvent.data);
      switch (data.action) {
        case 'notification':
          setNotifications(data.data);
          break;
        case 'a_new_notification':
          setNotifications((prevState: any) => [...prevState, data.data]);
          break;
        case 'unauthorized':
          socket.close();
          signOut();
          break;
        default:
          break;
      }

    };
  }, [socket]);


  return <WebSocketContext.Provider value={{ socket, notifications }}>{children}</WebSocketContext.Provider>;
};


export const useGlobalState = () => {
  return useContext(WebSocketContext);
};
