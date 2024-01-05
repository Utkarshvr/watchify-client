import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import theme from "./config/theme.js";
import Store from "./context/index.jsx";
// import CookieConsent from "react-cookie-consent";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={theme}>
    <Store>
      <App />
      {/* <CookieConsent
        location="top"
        buttonText="Sure man!!"
        cookieName="connect.sid"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={365}
      >
        Accept Cookie Please
      </CookieConsent> */}
    </Store>
  </ConfigProvider>
);
