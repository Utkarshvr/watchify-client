import PrivateRoute from "@/components/ProtectedRoutes/PrivateRoute";
import StudioSider from "@/components/core/studio/StudioSider";
import StudioHeader from "@/components/core/studio/StudioHeader";
import { useSider } from "@/context/Other/SiderProvider";
import { gray } from "@ant-design/colors";
import { Layout, theme } from "antd";
import { useLayoutEffect } from "react";

const { Header } = Layout;

const StudioLayout = () => {
  const { collapsed } = useSider();

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
    <Layout style={{ background: gray[7], minHeight: "100vh" }}>
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
        <StudioHeader />
      </Header>

      <Layout style={{ padding: 24, background: colorBgContainer }}>
        <StudioSider />

        <Layout style={{ background: colorBgContainer }} id="main-content">
          <PrivateRoute />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default StudioLayout;
