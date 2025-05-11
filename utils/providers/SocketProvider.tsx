"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

export interface SocketContextType {
  socket: Socket | null;
  onlineUsers: any[];
  subscribeToUserNotifications: (
    userId: string,
    callback: (data: any) => void
  ) => void;
  unsubscribeFromUserNotifications: (userId: string) => void;
  subscribeUsersChats: (userId: string, callback: (data: any) => void) => void;
  unsubscribeUsersChats: (userId: string) => void;
  subscribeSingleChat: (
    chat_id: string,
    userId: string,
    callback: (data: any) => void
  ) => void;
  unsubscribeSingleChat: (chat_id: string, userId: string) => void;
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  onlineUsers: [],
  subscribeToUserNotifications: () => {},
  unsubscribeFromUserNotifications: () => {},
  subscribeUsersChats: () => {},
  unsubscribeUsersChats: () => {},
  subscribeSingleChat: () => {},
  unsubscribeSingleChat: () => {},
});

export const useSocketContext = () => useContext(SocketContext);

export default function SocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io("https://doom.elsayed.aait-d.com:4047", {
      withCredentials: true,
      transports: ['websocket'], // Force WebSocket transport
    });

    newSocket.on("connect", () => {
      setSocket(newSocket);
      console.log("🔌 Socket connected:", newSocket.connected); // Should be true
    });

    newSocket.on("connect_error", (err) => {
      console.error("❌ Socket connection error:", err.message);
    });

    newSocket.on("disconnect", (reason) => {
      console.warn("⚠️ Socket disconnected:", reason);
    });

    newSocket.on("onlineUsers", (users: any[]) => {
      setOnlineUsers(users);
    });

    return () => {
      newSocket.close(); // Clean up on unmount
    };
  }, []);

  const subscribeToUserNotifications = useCallback(
    (userId: string, callback: (data: any) => void) => {
      // if (socket) {
      //     const eventName = `notification:${userId}`;
      //     socket.on(eventName, (data) => {
      //         callback(data); // Call the provided callback with the received data
      //     });
      // }
      if (socket) {
        const eventName = `notification:${userId}`;
        socket.on(eventName, callback);
      }
    },
    [socket]
  );

  const unsubscribeFromUserNotifications = useCallback(
    (userId: string) => {
      if (socket) {
        const eventName = `notification:${userId}`;
        socket.off(eventName);
      }
    },
    [socket]
  );

  const subscribeUsersChats = useCallback(
    (userId: string, callback: (data: any) => void) => {
      // if (socket) {
      //     const eventName = `chat-list:${userId}`;
      //     socket.on(eventName, (data) => {
      //         callback(data); // Call the provided callback with the received data
      //     });
      // }
      if (socket) {
        const eventName = `chat-list:${userId}`;
        socket.on(eventName, callback);
      }
    },
    [socket]
  );

  const unsubscribeUsersChats = useCallback(
    (userId: string) => {
      if (socket) {
        const eventName = `chat-list:${userId}`;
        socket.off(eventName);
      }
    },
    [socket]
  );
  const subscribeSingleChat = useCallback(
    (chat_id: string, userId: string, callback: (data: any) => void) => {
      // if (socket) {
      //     const eventName = `chat:${chat_id}:${userId}`;
      //     socket.on(eventName, (data) => {
      //         callback(data); // Call the provided callback with the received data
      //     });
      // }
      if (socket) {
        const eventName = `chat:${chat_id}:${userId}`;
        socket.on(eventName, callback);
      }
    },
    [socket]
  );

  const unsubscribeSingleChat = useCallback(
    (chat_id: string, userId: string) => {
      if (socket) {
        const eventName = `chat:${chat_id}:${userId}`;
        socket.off(eventName);
      }
    },
    [socket]
  );
  const contextValue = useMemo(
    () => ({
      socket,
      onlineUsers,
      subscribeToUserNotifications,
      unsubscribeFromUserNotifications,
      subscribeUsersChats,
      unsubscribeUsersChats,
      subscribeSingleChat,
      unsubscribeSingleChat,
    }),
    [
      socket,
      onlineUsers,
      subscribeToUserNotifications,
      unsubscribeFromUserNotifications,
      subscribeUsersChats,
      unsubscribeUsersChats,
      subscribeSingleChat,
      unsubscribeSingleChat,
    ]
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
}
