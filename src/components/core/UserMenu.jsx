import { useAuthUser } from "@/context/Auth/AuthProvider";
import { logout } from "@/helpers/GoogleAuth";
import { gray } from "@ant-design/colors";
import { LogoutOutlined, UploadOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Flex } from "antd";
import UploadVideoBtn from "../button/UploadVideoBtn";

export default function UserMenu() {
  const user = useAuthUser();

  const items = [
    {
      label: <UploadVideoBtn isUsedInMenu />,
      key: "upload",
      icon: <UploadOutlined />,
    },
    {
      label: <div onClick={logout}>Logout</div>,
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
      <Dropdown menu={{ items }} trigger={["click"]}>
        <Avatar
          style={{
            cursor: "pointer",
            border: "2px solid",
            borderColor: gray[6],
          }}
          size={"large"}
          src={user?.picture}
        />
      </Dropdown>

      {/* <Menu
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
      /> */}
    </Flex>
  );
}
