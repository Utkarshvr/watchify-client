import AuthProvider from "./Auth/AuthProvider";
import DrawerProvider from "./Other/DrawerProvider";

export default function Store({ children }) {
  return (
    <>
      <AuthProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </AuthProvider>
    </>
  );
}
