import { useAuthUser } from "@/context/Auth/AuthProvider";
import { Button, Flex, Grid } from "antd";
import GoogleSignupBtn from "@/components/button/GoogleSignupBtn";
import Search from "antd/es/input/Search";
import { gray } from "@ant-design/colors";
import { CloseOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useDrawer } from "@/context/Other/DrawerProvider";
import UserMenu from "../UserMenu";

const boxStyle = {
  padding: "1em",
  background: gray[7],
};

const { useBreakpoint } = Grid;

export default function StudioHeader() {
  const [showInput, setShowInput] = useState(false);

  const user = useAuthUser();

  const screens = useBreakpoint();

  const { showDrawer } = useDrawer();

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
      <Button onClick={showDrawer} type="text" icon={<MenuOutlined />} />

      {!screens.xs ? (
        <Search
          placeholder="Search"
          allowClear
          onSearch={() => {}}
          style={{ maxWidth: 600, width: screens.xs ? 250 : 600 }}
          size="large"
        />
      ) : null}

      <Flex gap={4} align={"center"}>
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
