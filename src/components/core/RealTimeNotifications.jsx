import { useNotificationAPI } from "@/context/Other/NotificationProvider";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Loading from "../ui/Loading";

export default function RealTimeNotifications({ children }) {
  const { openNotification, refreshNotifications } = useNotificationAPI();
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  useEffect(() => {
    // Connect to the socket server
    const socket = io(import.meta.env.VITE_ROOT_API_URL, {
      withCredentials: true,
      transports: ["websocket", "polling", "flashsocket"],
    });

    // Handle socket events
    socket.on("connect", () => {
      setIsSocketConnected(true);
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

  if (!isSocketConnected) return <Loading />;

  return <>{children}</>;
}
