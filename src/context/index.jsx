import AuthProvider from "./Auth/AuthProvider";
import CreatePlaylistModalProvider from "./Other/CreatePlaylistModalProvider";
import SiderProvider from "./Other/SiderProvider";
import MessageProvider from "./Other/MessageProvider";
import ModalProvider from "./Other/ModalProvider";

export default function Store({ children }) {
  return (
    <>
      <AuthProvider>
        <SiderProvider>
          <ModalProvider>
            <CreatePlaylistModalProvider>
              <MessageProvider>{children}</MessageProvider>
            </CreatePlaylistModalProvider>
          </ModalProvider>
        </SiderProvider>
      </AuthProvider>
    </>
  );
}
