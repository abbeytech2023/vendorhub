import { Navigate, Outlet } from "react-router-dom";
import Spinner from "./Spinner";
import { useAuthContext } from "../hooks/useAuthContext";
import { useUserProfileTable } from "../hooks/useUser";

export default function SuperAdminRoute() {
  const { user, authIsReady } = useAuthContext();
  const { data } = useUserProfileTable();

  //   const SUPER_ADMIN_UID =

  if (!authIsReady) {
    return <Spinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!data?.admin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
