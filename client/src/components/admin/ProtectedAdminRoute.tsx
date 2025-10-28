import { Outlet } from "react-router-dom";

import { useAdminAuth } from "../../contexts/AdminAuthContext";
import AdminAccessForm from "./AdminAccessForm";

function ProtectedAdminRoute(): JSX.Element {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminAccessForm />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;
