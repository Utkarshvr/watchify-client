import { useAuthUser } from "@/context/Auth/AuthProvider";
import { Button, Flex, Grid, Typography } from "antd";
import GoogleSignupBtn from "@/components/button/GoogleSignupBtn";
import Search from "antd/es/input/Search";
import {
  CloseOutlined,
  MenuOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useSider } from "@/context/Other/SiderProvider";
import UserMenu from "../UserMenu";
import { useModal } from "@/context/Other/ModalProvider";

const boxStyle = {
  width: "100%",
};
const { useBreakpoint } = Grid;

export default function StudioHeader() {
  const [showInput, setShowInput] = useState(false);

  const user = useAuthUser();

  const screens = useBreakpoint();

  const { toggleSider } = useSider();
  const { showModal } = useModal();

  if (showInput)
    return (
      <Flex
        style={boxStyle}
        gap={12}
        justify={"space-between"}
        align={"center"}
      >
        <img src="/assets/icon.png" width={28} height={28} alt="logo" />
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
      <Flex gap={24}>
        <Button onClick={toggleSider} type="text" icon={<MenuOutlined />} />
        <Flex align="center" justify="center" gap={8}>
          <img src="/assets/icon.png" width={28} height={28} alt="logo" />
          {!screens.xs && (
            <Typography.Text
              strong
              style={{ fontSize: 20, width: "max-content" }}
            >
              Watchify
            </Typography.Text>
          )}
        </Flex>
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

      <Flex gap={16} align={"center"}>
        <Button icon={<UploadOutlined />} onClick={showModal} type="primary">
          Upload
        </Button>

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
