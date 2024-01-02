import AuthProvider from "./Auth/AuthProvider";
import CreatePlaylistModalProvider from "./Other/CreatePlaylistModalProvider";
import DrawerProvider from "./Other/DrawerProvider";
import MessageProvider from "./Other/MessageProvider";
import ModalProvider from "./Other/ModalProvider";

export default function Store({ children }) {
  return (
    <>
      <AuthProvider>
        <DrawerProvider>
          <ModalProvider>
            <CreatePlaylistModalProvider>
              <MessageProvider>{children}</MessageProvider>
            </CreatePlaylistModalProvider>
          </ModalProvider>
        </DrawerProvider>
      </AuthProvider>
    </>
  );
}
