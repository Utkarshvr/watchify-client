import PrivateRoute from "@/components/ProtectedRoutes/PrivateRoute";
import StudioDrawer from "@/components/core/studio/StudioDrawer";
import StudioHeader from "@/components/core/studio/StudioHeader";
import { useDrawer } from "@/context/Other/DrawerProvider";
import { gray } from "@ant-design/colors";
import { Layout } from "antd";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const StudioLayout = () => {
  const { onClose: closeDrawer } = useDrawer();

  // Close the modal every time route changes
  const path = useLocation().pathname;

  useEffect(() => {
    if (path) closeDrawer();
  }, [path]);

  return (
    <Layout style={{ background: gray[7], minHeight: "100vh" }}>
      <StudioHeader />
      <StudioDrawer />
      <Layout style={{ padding: "1em", backgroundColor: "transparent" }}>
        <PrivateRoute />
      </Layout>
    </Layout>
  );
};

export default StudioLayout;
