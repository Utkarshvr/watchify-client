import MainDrawer from "@/components/core/MainDrawer";
import Header from "@/components/core/Header";
import { gray } from "@ant-design/colors";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDrawer } from "@/context/Other/DrawerProvider";

const MainLayout = () => {
  const { onClose: closeDrawer } = useDrawer();

  // Close the modal every time route changes
  const path = useLocation().pathname;

  useEffect(() => {
    if (path) closeDrawer();
  }, [path]);

  return (
    <Layout style={{ background: gray[7], minHeight: "100vh" }}>
      <Header />
      <MainDrawer />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
