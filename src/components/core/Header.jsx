import { useAuthUser } from "@/context/Auth/AuthProvider";
import { Button, Flex, Grid, Typography } from "antd";
import GoogleSignupBtn from "../button/GoogleSignupBtn";
import Search from "antd/es/input/Search";
import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSider } from "@/context/Other/SiderProvider";
import UserMenu from "./UserMenu";
import { useModal } from "@/context/Other/ModalProvider";
import UserNotificationMenu from "./UserNotificationMenu";
import UploadVideoBtn from "../button/UploadVideoBtn";
import { Link } from "react-router-dom";

const boxStyle = {
  width: "100%",
};

const { useBreakpoint } = Grid;

export default function MainHeader() {
  const [showInput, setShowInput] = useState(false);

  const user = useAuthUser();

  const screens = useBreakpoint();

  const { toggleSider } = useSider();

  if (showInput)
    return (
      <Flex
        style={boxStyle}
        gap={12}
        justify={"space-between"}
        align={"center"}
      >
        <Search
          placeholder="Search"
          allowClear
          onSearch={() => {}}
          size="middle"
        />
        <Button
          onClick={() => setShowInput(false)}
          type="text"
          shape="circle"
          icon={<CloseOutlined />}
        />
      </Flex>
    );

  return (
    <Flex style={boxStyle} gap={36} justify={"space-between"} align={"center"}>
      <Flex gap={24} align="center" >
        {!screens.xs && (
          <Button onClick={toggleSider} type="text" icon={<MenuOutlined />} />
        )}
        <Link style={{ width: "max-content" }} to={"/"}>
          <Typography.Text
            strong
            style={{ fontSize: 20, width: "max-content" }}
          >
            Watchify
          </Typography.Text>
        </Link>
      </Flex>

      {!screens.xs ? (
        <Search
          placeholder="Search"
          allowClear
          onSearch={() => {}}
          style={{ maxWidth: 600, width: screens.xs ? 250 : 600 }}
          size="large"
        />
      ) : null}

      <Flex gap={8} align={"center"}>
        {user?._id && !screens.xs && <UploadVideoBtn />}
        <UserNotificationMenu />
        {screens.xs ? (
          <Button
            onClick={() => setShowInput(true)}
            size="large"
            shape="circle"
            type="text"
            icon={<SearchOutlined />}
          />
        ) : null}
        {user ? <UserMenu /> : <GoogleSignupBtn />}
      </Flex>
    </Flex>
  );
}
