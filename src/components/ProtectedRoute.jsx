import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function ProtectedRoute() {
  const { user } = useAuthContext();
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
