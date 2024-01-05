import { useLayoutEffect, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  MenuOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Flex, Layout, Menu, theme } from "antd";
const { Header, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const App = () => {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useLayoutEffect(() => {
    const header = document.getElementById("main-header");
    const sider = document.getElementById("main-sider");
    const content = document.getElementById("main-content");

    const headerHeight = header.offsetHeight;
    const siderWidth = sider.offsetWidth;
    sider.style.height = `calc(100vh - ${headerHeight}px)`;
    content.style.marginLeft = `${siderWidth}px`;
    content.style.marginLeft = `${collapsed ? 80 : 200}px`;

    console.log({
      headerHeight,
      siderWidth,
      siderHeight: sider.style.height,
    });
  }, [collapsed]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          padding: "1em",
          background: colorBgContainer,
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
        }}
        id="main-header"
      >
        <Flex align="center">
          <Button
            shape="circle"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed((prev) => !prev)}
          />
        </Flex>
      </Header>

      <Layout>
        <Sider
          id="main-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{
            overflow: "auto",
            position: "fixed",
            left: 0,
            bottom: 0,
          }}
        >
          <div className="demo-logo-vertical" />
          {[1, 2, 3, 4, 5].map((e) => (
            <Menu
              key={e}
              // theme="dark"
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
            />
          ))}
        </Sider>

        <Layout id="main-content">
          <p style={{ color: "wheat" }}>HELLo</p>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
