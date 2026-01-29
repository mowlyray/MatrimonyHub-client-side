import { Link, NavLink, Outlet } from "react-router";
import { LogOut } from "lucide-react";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const axiosSecure = useAxiosSecure();

  // 🔥 ROLE FETCH (TanStack Query)
  useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      const match = res.data.find(
        (param) => param.email === user.email
      );
      if (match) {
        setRole(match.Role);
      }
      return match?.Role;
    },
  });

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 border-r border-gray-200">
        <Link
          to="/"
          className="text-2xl font-bold mt-5 text-[#E91E63] mb-6 tracking-wide"
        >
          Matrimony<span className="text-[#AD1457]">Hub</span>
        </Link>

        <nav className="flex flex-col gap-4 mt-10 text-base font-medium">
          {user && role !== "admin" && (
            <>
              <NavLink to="/dashboard/edit-biodata">✏️ Edit Biodata</NavLink>
              <NavLink to="/dashboard/view-biodata">👁️ View Biodata</NavLink>
              <NavLink to="/dashboard/my-contact-requests">
                📬 My Contact Requests
              </NavLink>
              <NavLink to="/dashboard/favourites">
                ❤️ Favourites Biodata
              </NavLink>
              <NavLink to="/dashboard/got-married">
                💍 Got Married
              </NavLink>
            </>
          )}

          {user && role === "admin" && (
            <>
              <NavLink to="/dashboard/admindashboard">
                Admin DashBoard
              </NavLink>
              <NavLink to="/dashboard/manageUsers">
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/approvedPremium">
                ApprovedPremium
              </NavLink>
              <NavLink to="/dashboard/approvedContactRequest">
                Approved Contact Request
              </NavLink>
              <NavLink to="/dashboard/success-stories">
                💍 Success Stories
              </NavLink>
            </>
          )}

          <NavLink
            to="/"
            className="mt-6 flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" /> Logout
          </NavLink>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-rose-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
