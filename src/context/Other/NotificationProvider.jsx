import { notification } from "antd";
import { createContext, useContext, useState } from "react";

const NotificationDATAContext = createContext();
const NotificationAPIContext = createContext();

export default function NotificationProvider({ children }) {
  const [notificationAPI, contextHolder] = notification.useNotification();
  const [fetchAgain, setFetchAgain] = useState(false);

  const openNotification = (notice) => {
    notificationAPI[notice?.type || "info"]({
      message: notice?.content,
      description: notice?.description,
    });
  };

  const refreshNotifications = () => setFetchAgain((prev) => !prev);

  return (
    <NotificationDATAContext.Provider value={{ fetchAgain }}>
      <NotificationAPIContext.Provider
        value={{ openNotification, refreshNotifications }}
      >
        {contextHolder}
        {children}
      </NotificationAPIContext.Provider>
    </NotificationDATAContext.Provider>
  );
}

export const useNotificationAPI = () => useContext(NotificationAPIContext);
export const useNotificationData = () => useContext(NotificationDATAContext);
