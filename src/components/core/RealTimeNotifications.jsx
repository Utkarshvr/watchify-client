import { useNotificationAPI } from "@/context/Other/NotificationProvider";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function RealTimeNotifications() {
  const { openNotification, refreshNotifications } = useNotificationAPI();

  useEffect(() => {
    // Connect to the socket server
    const socket = io(import.meta.env.VITE_ROOT_API_URL);

    // Handle socket events
    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.on("notify-user", (notice) => {
      console.log("Received message:", notice);
      // Update your React component state or perform any other actions
      openNotification(notice);
      refreshNotifications();
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return null;
}
