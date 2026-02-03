import { Navigate } from "react-router";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const axiosSecure = useAxiosSecure();

  useQuery({
    queryKey: ["dashboardRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      const match = res.data.find(
        (b) => b.email === user.email
      );
      if (match?.Role === "admin") {
        setRole("admin");
      } else {
        setRole("user");
      }
      return match?.Role;
    },
  });

  if (!role) return null;

  return role === "admin" ? (
    <Navigate to="/dashboard/admindashboard" replace />
  ) : (
    <Navigate to="/dashboard/edit-biodata" replace />
  );
};

export default DashboardRedirect;
