import { useDrawer } from "@/context/Other/DrawerProvider";
import { Drawer, Menu } from "antd";
import {
  EditOutlined,
  LayoutOutlined,
  PlaySquareOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  getItem(<Link to={"/"}>Home</Link>, "home", <LayoutOutlined />),
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

export default function StudioDrawer() {
  const { open, onClose } = useDrawer();
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  // Close the modal every time route changes
  const path = useLocation().pathname;

  console.log(current);
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
    <>
      <Drawer
        title="Studio"
        placement="left"
        onClose={onClose}
        open={open}
        width={200}
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
