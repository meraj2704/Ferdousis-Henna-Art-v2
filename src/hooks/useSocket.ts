import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// const SOCKET_URL = "http://localhost:4040/";
const SOCKET_URL = "https://api.ferdousishenna.cfd/";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);

    socketInstance.on(
      "initialNotifications",
      ({ notifications, unreadCount }) => {
        console.log("All notifications received:", notifications);
        setNotifications(notifications);
        setUnreadCount(unreadCount);
      }
    );

    socketInstance.on("newOrder", ({ newNotification, updatedUnreadCount }) => {
      console.log("New order notification received:", newNotification);
      setNotifications((prev) => [...prev, newNotification]);
      setUnreadCount(updatedUnreadCount);
    });

    socketInstance.on(
      "notificationsUpdate",
      ({ updatedNotifications, updatedUnreadCount }) => {
        console.log("Notifications updated:", updatedNotifications);
        setNotifications(updatedNotifications);
        setUnreadCount(updatedUnreadCount);
      }
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const markNotificationAsRead = (notificationId: string) => {
    if (socket) {
      socket.emit("markAsRead", notificationId);
    }
  };

  return { socket, notifications, unreadCount, markNotificationAsRead };
};

export default useSocket;
