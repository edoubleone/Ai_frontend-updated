import { useAdminAuth } from "@/context/admin-auth-provider";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default AdminPrivateRoute;
