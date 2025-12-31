
// import React, { use, useContext } from 'react';
// import { Navigate, useLocation } from 'react-router';

// import useUserRole from '../hooks/useUserRole';
// import { AuthContext } from '../provider/AuthProvider';

// const AdminRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const { role, roleLoading } = useUserRole();
//   const location = useLocation();

//   if (loading || roleLoading) {
//     return <span className="loading loading-spinner loading-xl"></span>;
//   }

//   if (!user || role !== 'admin') {
//     return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
//   }

//   return children;
// };

// export default AdminRoute;
