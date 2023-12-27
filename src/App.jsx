import { RouterProvider } from "react-router-dom";
import router from "@/config/Router";

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
