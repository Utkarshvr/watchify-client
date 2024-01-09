import { RouterProvider } from "react-router-dom";
import router from "@/config/Router";
import CreatePlaylistModal from "./components/modal/CreatePlaylistModal";
import UploadVideoModal from "./components/modal/UploadVideoModal";
import RealTimeNotifications from "./components/core/RealTimeNotifications";
const App = () => {
  const redirect_pathname = localStorage.getItem("redirect_pathname");

  if (redirect_pathname) {
    localStorage.removeItem("redirect_pathname");
    window.location = location.origin + redirect_pathname;
  }

  return (
    <>
      <RealTimeNotifications />
      <RouterProvider router={router} />
      <CreatePlaylistModal />
      <UploadVideoModal />
    </>
  );
};

export default App;
