import { useAuthUser } from "@/context/Auth/AuthProvider";
import { logout } from "@/helpers/GoogleAuth";
import { gray } from "@ant-design/colors";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Menu } from "antd";
import { useState } from "react";

export default function UserMenu() {
  const user = useAuthUser();
  const [current, setCurrent] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const showMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const items = [
    {
      label: (
        <Button onClick={logout} type="text">
          Logout
        </Button>
      ),
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Flex
      style={{
        position: "relative",
      }}
    >
      <Avatar
        style={{ cursor: "pointer", border: "2px solid", borderColor: gray[6] }}
        onClick={showMenu}
        size={"large"}
        src={user?.picture}
      />
      <Menu
        style={{
          position: "absolute",
          top: "100%",
          right: 0,
          zIndex: 10000,
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden",
          transition: "all 150ms ease-in-out",
          border: 0,
          borderRadius: "1em",
        }}
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
      />
    </Flex>
  );
}
