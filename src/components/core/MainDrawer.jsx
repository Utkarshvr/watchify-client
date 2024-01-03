import { useDrawer } from "@/context/Other/DrawerProvider";
import { Drawer, Grid, Menu } from "antd";
import {
  ClockCircleOutlined,
  EditOutlined,
  HistoryOutlined,
  HomeOutlined,
  LayoutOutlined,
  LikeOutlined,
  PlayCircleOutlined,
  PlaySquareOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { getUsersPlaylists } from "@/api/apiCalls";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export default function MainDrawer() {
  const { open, onClose } = useDrawer();
  const [current, setCurrent] = useState("1");
  const [playlists, setPlaylists] = useState([]);

  const user = useAuthUser();
  useEffect(() => {
    (async () => {
      if (user?._id) {
        const { data } = await getUsersPlaylists();
        setPlaylists(data?.playlists);
      }
    })();
  }, [user?._id]);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const items = [
    getItem(<Link to={""}>Home</Link>, "Home", <HomeOutlined />),
    getItem(<Link to={"studio"}>Studio</Link>, "Studio", <LayoutOutlined />),
    getItem(
      <Link to={"subscription"}>Subscription</Link>,
      "Subscription",
      <PlaySquareOutlined />
    ),
    getItem(
      <Link to={"customization"}>You</Link>,
      "customization",
      <EditOutlined />,
      [
        getItem(
          <Link to={`/channel/@${user?.user_handle}`}>Your Channel</Link>,
          "Your Channel",
          <UserOutlined />
        ),
        getItem(
          <Link to={"/studio/content"}>Your Videos</Link>,
          "Your Videos",
          <PlayCircleOutlined />
        ),
        getItem(
          <Link to={"/history"}>History</Link>,
          "History",
          <HistoryOutlined />
        ),
        getItem(
          <Link to={`/playlist/${user?.watch_later_playlist_id}`}>
            Watch Later
          </Link>,
          "Watch Later",
          <ClockCircleOutlined />
        ),
        getItem(
          <Link to={`/playlist/${user?.liked_videos_playlist_id}`}>
            Liked Videos
          </Link>,
          "Liked Videos",
          <LikeOutlined />
        ),
        getItem(
          <>
            Playlist (
            {
              playlists
                .map((playlist) => !playlist?.isDefault && true)
                .filter(Boolean).length
            }
            )
          </>,
          "Playlist",
          <PlaySquareOutlined />,
          playlists
            .map(
              (playlist) =>
                !playlist?.isDefault &&
                getItem(
                  <Link to={`/playlist/${playlist?._id}`}>
                    {playlist?.title}
                  </Link>,
                  playlist?.title,
                  <UnorderedListOutlined />
                )
            )
            .filter(Boolean)
        ),
      ]
    ),
  ];

  const screens = Grid.useBreakpoint();
  return (
    <>
      <Drawer
        title="Watchify"
        placement="left"
        onClose={onClose}
        open={open}
        width={screens.xs ? 180 : 300}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          onClick={onClick}
          style={{
            width: "100%",
            minHeight: "100%",
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </Drawer>
    </>
  );
}
