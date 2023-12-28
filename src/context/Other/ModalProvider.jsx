import { createContext, useContext, useState } from "react";

const ModalContext = createContext({ open: false });

export default function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ open, showModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
