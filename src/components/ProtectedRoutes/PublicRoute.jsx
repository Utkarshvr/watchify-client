import { useAuthLoading, useAuthUser } from "@/context/Auth/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading";

const PublicRoute = () => {
  const user = useAuthUser();
  const loading = useAuthLoading();

  if (loading) return <Loading />;

  if (!user) return <Outlet />;
  return <Navigate to="/" />;
};

export default PublicRoute;
