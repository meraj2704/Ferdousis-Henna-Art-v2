import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://ferdousis-henna-art-backend.vercel.app"; // Replace with your backend URL

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);

    // Listen for the "newOrder" event
    socketInstance.on("newOrder", (notification) => {
      console.log("New order notification received:", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    setSocket(socketInstance);

    // Clean up when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, notifications };
};

export default useSocket;
