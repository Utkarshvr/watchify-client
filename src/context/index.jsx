import AuthProvider from "./Auth/AuthProvider";
import DrawerProvider from "./Other/DrawerProvider";
import MessageProvider from "./Other/MessageProvider";
import ModalProvider from "./Other/ModalProvider";

export default function Store({ children }) {
  return (
    <>
      <AuthProvider>
        <DrawerProvider>
          <ModalProvider>
            <MessageProvider>{children}</MessageProvider>
          </ModalProvider>
        </DrawerProvider>
      </AuthProvider>
    </>
  );
}
