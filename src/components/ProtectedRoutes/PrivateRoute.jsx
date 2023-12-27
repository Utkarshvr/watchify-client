import { useAuthLoading, useAuthUser } from "@/context/Auth/AuthProvider";
import { Outlet } from "react-router-dom";
import Loading from "../ui/Loading";
import { googleAuth } from "@/helpers/GoogleAuth";

const PrivateRoute = () => {
  const user = useAuthUser();
  const loading = useAuthLoading();

  // Develop a way to redirect user to the path he was already going

  if (loading) return <Loading />;

  if (user) return <Outlet />;
  return googleAuth();
};

export default PrivateRoute;
