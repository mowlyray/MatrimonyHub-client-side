// import { useContext, useEffect, useState } from "react";
// import { Navigate } from "react-router";
// import axios from "axios";
// import { AuthContext } from "../context/AuthContext";

// const DashboardRedirect = () => {
//   const { user } = useContext(AuthContext);
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!user?.email) return;

//     axios
//       .get(`http://localhost:5000/users/role?email=${user.email}`)
//       .then(res => {
//         setRole(res.data.role); // admin | user
//       })
//       .finally(() => setLoading(false));
//   }, [user]);

//   if (loading) {
//     return <div>Loading dashboard...</div>;
//   }

//   if (role === "admin") {
//     return <Navigate to="/dashboard/admindashboard" replace />;
//   }

//   return <Navigate to="/dashboard/edit-biodata" replace />;
// };

// export default DashboardRedirect;
