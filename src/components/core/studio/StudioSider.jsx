import { Layout, Menu } from "antd";
import {
  EditOutlined,
  HomeOutlined,
  LayoutOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSider } from "@/context/Other/SiderProvider";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to={"/"}>Home</Link>, "home", <HomeOutlined />),
  getItem(
    <Link to={"/studio"}>Dashboard</Link>,
    "dashboard",
    <LayoutOutlined />
  ),
  getItem(
    <Link to={"content"}>Content</Link>,
    "content",
    <PlaySquareOutlined />
  ),
  getItem(
    <Link to={"customization"}> Customization</Link>,
    "customization",
    <EditOutlined />
  ),
];

export default function StudioSider() {
  const { collapsed, toggleSider } = useSider();

  const [current, setCurrent] = useState("dashboard");
  const onClick = (e) => {
    setCurrent(e.key);
  };
  // Close the modal every time route changes
  const path = useLocation().pathname;

  useEffect(() => {
    switch (path) {
      case "/studio":
        setCurrent("dashboard");
        break;
      case "/studio/content":
        setCurrent("content");
        break;
      case "/studio/customization":
        setCurrent("customization");
        break;
      default:
        break;
    }
  }, [path]);

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
