import { notification } from "antd";
import { createContext, useContext } from "react";

const NotificationContext = createContext();

export default function NotificationProvider({ children }) {
  const [notificationAPI, contextHolder] = notification.useNotification();

  const openNotification = (notice) => {
    notificationAPI[notice?.type || "info"]({
      message: notice?.content,
      description: notice?.description,
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotificationAPI = () => useContext(NotificationContext);
