import { useEffect, useState } from "react";
import { List, theme } from "antd";
import {
  getUsersNotifications,
  markAllUsersNotificationsAsRead,
} from "@/api/apiCalls";
import NotificationItem from "./NotificationItem";

const NotificationsList = ({ unreadNotifications, setUnreadNotifications }) => {
  const duplicateUnreadNotifications = [...unreadNotifications];

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const {
    token: { colorBgContainer, colorBorder },
  } = theme.useToken();

  const loadNotifications = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const data = await getUsersNotifications();
      console.log(data);
      setNotifications(data?.data?.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const markAllNotificationsAsRead = async () => {
    try {
      const data = await markAllUsersNotificationsAsRead();
      console.log(data);
      //   setNotifications(data?.data?.notifications || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (unreadNotifications?.length > 0) {
      setUnreadNotifications([]);
      markAllNotificationsAsRead();
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        top: 70,
        borderRadius: 24,
        transition: "all 1s",
      }}
    >
      <List
        dataSource={notifications}
        renderItem={(item) => (
          <NotificationItem
            item={item}
            key={item?._id}
            isUnread={duplicateUnreadNotifications?.some(
              (notif) => notif?._id === item?._id
            )}
          />
        )}
        bordered
        style={{
          background: colorBgContainer,
          padding: 8,

          width: 500,
          height: 600,
        }}
      />
    </div>
  );
};
export default NotificationsList;
