import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://ferdousis-henna-art-backend.vercel.app/";
// const SOCKET_URL = "http://localhost:4040/";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    socketInstance.on("newOrder", (notification) => {
      console.log("New order notification received:", notification);
      setNotifications((prev) => [...prev, notification]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, notifications };
};

export default useSocket;
