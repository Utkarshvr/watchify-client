import { createContext, useContext, useState } from "react";

const DrawerContext = createContext({ open: false });

export default function DrawerProvider({ children }) {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ open, showDrawer, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
}

export const useDrawer = () => useContext(DrawerContext);
