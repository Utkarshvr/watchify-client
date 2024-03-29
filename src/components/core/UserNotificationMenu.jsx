import { BellOutlined, BellFilled } from "@ant-design/icons";
import { Badge, Button } from "antd";
import FakeList from "./FakeList";
import { useEffect, useState } from "react";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { getUsersNotifications } from "@/api/apiCalls";
import NotificationsList from "./notification/NotificationsList";
import { useNotificationData } from "@/context/Other/NotificationProvider";

export default function UserNotificationMenu() {
  const user = useAuthUser();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const { fetchAgain } = useNotificationData();

  useEffect(() => {
    if (user?._id) {
      (async () => {
        try {
          const data = await getUsersNotifications("false");
          console.log(data);

          setUnreadNotifications(data?.data?.notifications);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [user?._id, fetchAgain]);

  const closeList = () => setOpenNotifications((prev) => !prev);

  return (
    <div style={{ position: "relative" }}>
      <Badge
        count={unreadNotifications?.length}
        size="default"
        overflowCount={9}
        offset={[-5, 8]}
      >
        <Button
          shape="circle"
          icon={openNotifications ? <BellFilled /> : <BellOutlined />}
          size="large"
          onClick={closeList}
        />
      </Badge>
      {openNotifications && (
        <NotificationsList
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          closeList={closeList}
        />
      )}
    </div>
  );
}
