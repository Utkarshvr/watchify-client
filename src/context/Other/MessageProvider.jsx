import { message } from "antd";
import { createContext, useContext } from "react";

const MessageContext = createContext();

export default function MessageProvider({ children }) {
  const [messageApi, contextHolder] = message.useMessage();

  const success = (content) => {
    messageApi.open({
      type: "success",
      content,
    });
  };

  const error = (content) => {
    messageApi.open({
      type: "error",
      content,
    });
  };

  const warning = (content) => {
    messageApi.open({
      type: "warning",
      content,
    });
  };
  return (
    <MessageContext.Provider value={{ success, error, warning }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
}

export const useMessageAPI = () => useContext(MessageContext);
