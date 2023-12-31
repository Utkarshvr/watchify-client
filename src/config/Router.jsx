import MainLayout from "@/layout/MainLayout";
import StudioLayout from "@/layout/StudioLayout";
import HomePage from "@/pages/HomePage";
import DashboardPage from "@/pages/studio/DashboardPage";
import ErrorPage from "@/pages/error/ErrorPage";

import { createBrowserRouter } from "react-router-dom";
import CustomizationPage from "@/pages/studio/CustomizationPage";
import RoughPage from "@/pages/rough/RoughPage";
import ContentPage from "@/pages/studio/ContentPage";
import VideoPage from "@/pages/video/VideoPage";

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
          {
            path: "/videos/:videoID",
            element: <VideoPage />,
          },
          {
            path: "/rough",
            element: <RoughPage />,
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
          {
            path: "content",
            element: <ContentPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
