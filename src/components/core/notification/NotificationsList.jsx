import { useEffect, useState } from "react";
import { Button, Flex, Grid, List, Typography, theme } from "antd";
import {
  getUsersNotifications,
  markAllUsersNotificationsAsRead,
} from "@/api/apiCalls";
import NotificationItem from "./NotificationItem";
import { CloseCircleOutlined } from "@ant-design/icons";

const NotificationsList = ({
  unreadNotifications,
  setUnreadNotifications,
  closeList,
}) => {
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

  const screens = Grid.useBreakpoint();
  console.log(!screens.md ? "100vw" : "auto");

  return (
    <div
      style={{
        position: !screens.md ? "fixed" : "absolute",
        right: 0,
        top: !screens.md ? 0 : 70,
        borderRadius: 24,
        transition: "all 1s",
        width: !screens.md ? "100vw" : 500,
        height: !screens.md ? "100vh" : 600,
        zIndex: 10000000,
      }}
    >
      <List
        dataSource={notifications}
        header={
          <Flex justify="space-between">
            <Typography.Text strong>Notifications</Typography.Text>
          </Flex>
        }
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
          height: "100%",
        }}
      />
      {!screens.md && (
        <Button
          icon={<CloseCircleOutlined />}
          onClick={closeList}
          style={{
            position: "absolute",
            bottom: 100,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          size="large"
          shape="circle"
        />
      )}
    </div>
  );
};
export default NotificationsList;
