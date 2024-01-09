import { useEffect, useState } from "react";
import { Flex, Image, List, theme } from "antd";
import {
  getUsersNotifications,
  markAllUsersNotificationsAsRead,
} from "@/api/apiCalls";
import { Link } from "react-router-dom";
import { CheckCircleOutlined } from "@ant-design/icons";

const NotificationsList = ({ unreadNotifications }) => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  console.log({ unreadNotifications });

  const {
    token: { colorBgContainer },
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
      console.log("Should mark as read");
      markAllNotificationsAsRead();
    }
  }, []);

  return (
    <div
      style={{
        width: 500,
        height: 600,
        overflow: "auto",
        padding: "0 16px",
        background: colorBgContainer,
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
          <List.Item key={item._id}>
            <List.Item.Meta
              avatar={
                <CheckCircleOutlined style={{ color: "green", fontSize: 24 }} />
              }
              title={item?.content}
              description={new Date(item?.createdAt).toLocaleString()}
            />
            <Flex gap={8} align="center">
              <Link to={`/video/${item?.payload?.newVideo?.videoID}`}>
                <Image
                  src={item?.payload?.newVideo?.thumbnail}
                  preview={false}
                  width={100}
                />
              </Link>

              {unreadNotifications?.some(
                (notif) => notif?._id === item?._id
              ) && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "100%",
                    background: "#fff",
                  }}
                />
              )}
            </Flex>
          </List.Item>
        )}
      />
    </div>
  );
};
export default NotificationsList;
