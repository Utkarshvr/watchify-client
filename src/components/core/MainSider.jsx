import { Layout, Menu } from "antd";
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
import { useSider } from "@/context/Other/SiderProvider";
import { useAuthUser } from "@/context/Auth/AuthProvider";
import { useEffect, useState } from "react";
import { getUsersPlaylists } from "@/api/apiCalls";
import { getMenuItem } from "@/helpers/UIHelpers";
import { Link } from "react-router-dom";

const { Sider } = Layout;

export default function MainSider() {
  const { collapsed, toggleSider } = useSider();

  const [current, setCurrent] = useState("Home");
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
    setCurrent(e.key);
  };

  const items = [
    getMenuItem(<Link to={""}>Home</Link>, "Home", <HomeOutlined />),
    getMenuItem(
      <Link to={"studio"}>Studio</Link>,
      "Studio",
      <LayoutOutlined />
    ),
    getMenuItem(
      <Link to={"subscription"}>Subscription</Link>,
      "Subscription",
      <PlaySquareOutlined />
    ),
    getMenuItem(
      <Link to={"customization"}>You</Link>,
      "customization",
      <UserOutlined />,
      [
        getMenuItem(
          <Link to={`/channel/@${user?.user_handle}`}>Your Channel</Link>,
          "Your Channel",
          <UserOutlined />
        ),
        getMenuItem(
          <Link to={"/studio/content"}>Your Videos</Link>,
          "Your Videos",
          <PlayCircleOutlined />
        ),
        getMenuItem(
          <Link to={"/history"}>History</Link>,
          "History",
          <HistoryOutlined />
        ),
        getMenuItem(
          <Link
            to={`/playlist/${
              playlists?.find(
                (playlist) =>
                  playlist?.isDefault && playlist?.title === "Watch Later"
              )?._id
            }`}
          >
            Watch Later
          </Link>,

          "Watch Later",
          <ClockCircleOutlined />
        ),
        getMenuItem(
          <Link
            to={`/playlist/${
              playlists?.find(
                (playlist) =>
                  playlist?.isDefault && playlist?.title === "Liked Videos"
              )?._id
            }`}
          >
            Liked Videos
          </Link>,
          "Liked Videos",
          <LikeOutlined />
        ),
        getMenuItem(
          <>
            Playlist (
            {
              playlists.filter((playlist) => !playlist?.isDefault && true)
                .length
            }
            )
          </>,
          "Playlist",
          <PlaySquareOutlined />,
          playlists
            .map(
              (playlist) =>
                !playlist?.isDefault &&
                getMenuItem(
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

  return (
    <Sider
      id="main-sider"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleSider}
      theme="light"
      style={{
        overflow: "auto",
        position: "fixed",
        left: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        onClick={onClick}
        style={{
          width: "100%",
          minHeight: "100%",
        }}
        defaultSelectedKeys={["Home"]}
        defaultOpenKeys={["Home"]}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
}
