import { createContext, useContext, useState } from "react";

const CreatePlaylistModalContext = createContext({ open: false });

export default function CreatePlaylistModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <CreatePlaylistModalContext.Provider
      value={{ open, showModal, closeModal }}
    >
      {children}
    </CreatePlaylistModalContext.Provider>
  );
}

export const useCreatePlaylistModal = () =>
  useContext(CreatePlaylistModalContext);
