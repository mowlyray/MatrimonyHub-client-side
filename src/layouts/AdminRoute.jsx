import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import useUserRole from "../hooks/useUserRole";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user || role !== "admin") {
    return (
      <Navigate
        to="/forbidden"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  return children;
};

export default AdminRoute;
