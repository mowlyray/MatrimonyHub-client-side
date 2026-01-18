import { Navigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    axios.get("http://localhost:5000/biodatas")
      .then(res => {
        const match = res.data.find(b => b.email === user.email);
        if (match?.Role === "admin") {
          setRole("admin");
        } else {
          setRole("user");
        }
      });
  }, [user]);

  if (!role) return null; // loading দেখাতে চাইলে দিতে পারো

  // এখানেই magic
  return role === "admin"
    ? <Navigate to="/dashboard/admindashboard" replace />
    : <Navigate to="/dashboard/edit-biodata" replace />;
};

export default DashboardRedirect;
