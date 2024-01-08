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
import ChannelPage from "@/pages/channel/ChannelPage";
import PlaylistPage from "@/pages/playlist/PlaylistPage";
import HistoryPage from "@/pages/history/HistoryPage";
import NewLayoutPage from "@/layout/rough/NewLayoutPage";
import SubscriptionPage from "@/pages/subscription/SubscriptionPage";

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
            path: "subscription",
            element: <SubscriptionPage />,
          },
          {
            path: "/videos/:videoID",
            element: <VideoPage />,
          },
          {
            path: "/channel/:user_handle",
            element: <ChannelPage />,
          },
          {
            path: "/playlist/:playlistID",
            element: <PlaylistPage />,
          },
          {
            path: "/history",
            element: <HistoryPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/rough",
    // element: <MainLayout />,
    children: [
      {
        children: [
          {
            path: "",
            element: <RoughPage />,
          },
          {
            path: "new-layout",
            element: <NewLayoutPage />,
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
