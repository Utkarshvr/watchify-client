import MainLayout from "@/layout/MainLayout";
import StudioLayout from "@/layout/StudioLayout";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/studio/DashboardPage";
import ErrorPage from "@/pages/error/ErrorPage";

import { createBrowserRouter } from "react-router-dom";
import CustomizationPage from "@/pages/studio/CustomizationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        // element: <AuthRoute />,
        children: [
          {
            path: "",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  {
    path: "/studio",
    element: <StudioLayout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <DashboardPage />,
          },
          {
            path: "customization",
            element: <CustomizationPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
