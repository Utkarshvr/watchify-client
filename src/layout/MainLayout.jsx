import MainSider from "@/components/core/MainSider";
import MainHeader from "@/components/core/Header";
import { Layout, theme } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import { useSider } from "@/context/Other/SiderProvider";
// import MainSider from "@/components/core/MainSider";

const { Header } = Layout;

const MainLayout = () => {
  const { collapsed } = useSider();

  // // Close the modal every time route changes
  // const path = useLocation().pathname;

  // useEffect(() => {
  //   if (path) closeSider();
  // }, [path]);

  const {
    token: { colorBgContainer },
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
    <Layout style={{ minHeight: "100vh" }}>
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
        <MainHeader />
      </Header>

      <Layout>
        {/* Sider */}
        <MainSider />
        {/* <MainSider /> */}

        <Layout style={{ background: colorBgContainer }} id="main-content">
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
