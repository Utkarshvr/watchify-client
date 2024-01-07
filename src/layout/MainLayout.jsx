import MainSider from "@/components/core/MainSider";
import MainHeader from "@/components/core/Header";
import { Grid, Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useSider } from "@/context/Other/SiderProvider";
// import MainSider from "@/components/core/MainSider";

const { Header } = Layout;

const MainLayout = () => {
  const { collapsed } = useSider();
  const screens = Grid.useBreakpoint();

  const {
    token: { colorBgContainer, screenXXL },
  } = theme.useToken();

  useLayoutEffect(() => {
    const header = document.getElementById("main-header");
    const sider = document.getElementById("main-sider");
    const content = document.getElementById("main-content");

    const headerHeight = header.offsetHeight;
    const siderWidth = sider.offsetWidth;
    sider.style.height = screens.xs
      ? "auto"
      : `calc(100vh - ${headerHeight}px)`;

    sider.style.width = screens.xs ? "100vw" : `auto`;
    sider.style.maxWidth = "none";

    content.style.marginLeft = screens.xs
      ? "auto"
      : `${collapsed ? 80 : 200}px`;

    console.log({
      headerHeight,
      siderWidth,
      siderHeight: sider.style.height,
    });
  }, [collapsed, screens.xs]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        style={{
          padding: 30,
          background: colorBgContainer,
          position: "sticky",
          top: 0,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
        }}
        id="main-header"
      >
        <MainHeader />
      </Header>

      <Layout
        style={{
          display: "flex",
          // alignItems: "center",
          justifyContent: "center",
          background: colorBgContainer,
          padding: 24,
        }}
      >
        {/* Sider */}
        <MainSider />
        {/* <MainSider /> */}

        <Layout
          style={{
            background: colorBgContainer,

            maxWidth: screenXXL,
          }}
          id="main-content"
        >
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
