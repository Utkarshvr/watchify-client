import { createContext, useContext, useState } from "react";

const SiderContext = createContext({ collapsed: false });

export default function SiderProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    // According to User Preference
    JSON.parse(localStorage.getItem("sider-collapsed"))
  );

  const toggleSider = () => {
    localStorage.setItem("sider-collapsed", JSON.stringify(!collapsed));
    setCollapsed((prev) => !prev);
  };

  return (
    <SiderContext.Provider value={{ collapsed, toggleSider }}>
      {children}
    </SiderContext.Provider>
  );
}

export const useSider = () => useContext(SiderContext);
