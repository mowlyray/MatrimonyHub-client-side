// import { use, useEffect, useState } from "react";

// import { AuthContext } from "../provider/AuthProvider";

// const useUserRole = () => {
//   const { user } = use(AuthContext);
//   const [role, setRole] = useState(null);
//   const [roleLoading, setRoleLoading] = useState(true);

//   useEffect(() => {
//     if (user?.email) {
//       fetch(`http://localhost:5000/users/role/${user.email}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setRole(data.role); // assuming backend returns: { role: "admin" }
//           setRoleLoading(false);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch role", err);
//           setRoleLoading(false);
//         });
//     }
//   }, [user]);

//   return { role, roleLoading };
// };

// export default useUserRole;
