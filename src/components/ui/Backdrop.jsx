import { Layout } from "antd";

export default function Backdrop({ children }) {
  return (
    <Layout
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.7)",
        zIndex: 1000,
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        position: "absolute",
      }}
    >
      {children}
    </Layout>
  );
}
