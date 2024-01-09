import AuthProvider from "./Auth/AuthProvider";
import CreatePlaylistModalProvider from "./Other/CreatePlaylistModalProvider";
import SiderProvider from "./Other/SiderProvider";
import MessageProvider from "./Other/MessageProvider";
import ModalProvider from "./Other/ModalProvider";
import NotificationProvider from "./Other/NotificationProvider";

export default function Store({ children }) {
  return (
    <>
      <AuthProvider>
        <SiderProvider>
          <ModalProvider>
            <CreatePlaylistModalProvider>
              <MessageProvider>
                <NotificationProvider>{children}</NotificationProvider>
              </MessageProvider>
            </CreatePlaylistModalProvider>
          </ModalProvider>
        </SiderProvider>
      </AuthProvider>
    </>
  );
}
