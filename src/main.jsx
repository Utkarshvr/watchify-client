import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import theme from "./config/theme.js";
import Store from "./context/index.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={theme}>
    <Store>
      <App />
    </Store>
  </ConfigProvider>
);
