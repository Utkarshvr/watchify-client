import { RouterProvider } from "react-router-dom";
import router from "@/config/Router";
import CreatePlaylistModal from "./components/modal/CreatePlaylistModal";
import UploadVideoModal from "./components/modal/UploadVideoModal";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <CreatePlaylistModal />
      <UploadVideoModal />
    </>
  );
};

export default App;
