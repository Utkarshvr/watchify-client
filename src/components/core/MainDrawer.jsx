import { useDrawer } from "@/context/Other/DrawerProvider";
import { Drawer, Grid, Menu } from "antd";
import {
  EditOutlined,
  HomeOutlined,
  LayoutOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to={""}>Home</Link>, "sub1", <HomeOutlined />),
  getItem(<Link to={"studio"}>Studio</Link>, "sub1", <HomeOutlined />),
  getItem(
    <Link to={"subscription"}>Subscription</Link>,
    "sub2",
    <PlaySquareOutlined />
  ),
  getItem(<Link to={"customization"}>You</Link>, "sub3", <EditOutlined />, [
    getItem(<Link to={""}>Your Channel</Link>, "sub1", <LayoutOutlined />),
    getItem(<Link to={""}>Your Videos</Link>, "sub1", <LayoutOutlined />),
    getItem(<Link to={""}>History</Link>, "sub1", <LayoutOutlined />),
    getItem(<Link to={""}>Watch Later</Link>, "sub1", <LayoutOutlined />),
    getItem(<Link to={""}>Liked Videos</Link>, "sub1", <LayoutOutlined />),
    getItem(<Link to={""}>Playlist</Link>, "sub1", <LayoutOutlined />, [
      getItem(
        <Link to={""}>Tate Podcasts 🎙️</Link>,
        "sub1",
        <LayoutOutlined />
      ),
      getItem(
        <Link to={""}>Everything about Money 💰</Link>,
        "sub1",
        <LayoutOutlined />
      ),
    ]),
  ]),
];

export default function MainDrawer() {
  const { open, onClose } = useDrawer();
  const [current, setCurrent] = useState("1");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

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
