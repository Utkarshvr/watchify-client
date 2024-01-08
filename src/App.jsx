import { RouterProvider } from "react-router-dom";
import router from "@/config/Router";
import CreatePlaylistModal from "./components/modal/CreatePlaylistModal";
import UploadVideoModal from "./components/modal/UploadVideoModal";
import { io } from "socket.io-client";
import { useEffect } from "react";

const App = () => {
  const redirect_pathname = localStorage.getItem("redirect_pathname");

  if (redirect_pathname) {
    localStorage.removeItem("redirect_pathname");
    window.location = location.origin + redirect_pathname;
  }

  useEffect(() => {
    // Connect to the socket server
    const socket = io("http://localhost:8080");

    // Handle socket events
    socket.on("connect", () => {
      console.log("Connected to the socket server");
    });

    socket.on("notify-user", (data) => {
      console.log("Received message:", data);
      // Update your React component state or perform any other actions
    });

    // Cleanup the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <>
      <RouterProvider router={router} />
      <CreatePlaylistModal />
      <UploadVideoModal />
    </>
  );
};

export default App;
