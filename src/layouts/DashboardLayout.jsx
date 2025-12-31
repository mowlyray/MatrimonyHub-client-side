import { Link, NavLink, Outlet } from "react-router";
import { LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
       const [role, setRole] = useState('')
    useEffect(() => {
        if (!user?.email) return;

        const fetchRole = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/biodatas`);
                const match = res.data.find((param) => param.email === user.email);
                if (match) {
                    setRole(match.Role);
                }
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };

        fetchRole();
    }, [user?.email]);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 border-r border-gray-200">
        <Link to="/" className="text-2xl font-bold mt-5 text-[#E91E63] mb-6 tracking-wide">
          Matrimony<span className="text-[#AD1457]">Hub</span>
        </Link>

        <nav className="flex flex-col gap-4 mt-10 text-base font-medium">
          {user && role !== 'admin' && <>
          <NavLink
            to="/dashboard/edit-biodata"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
            ✏️ Edit Biodata
          </NavLink>

          <NavLink
            to="/dashboard/view-biodata"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
            👁️ View Biodata
          </NavLink>

          <NavLink
            to="/dashboard/contacts"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
            📬 My Contact Requests
          </NavLink>

          <NavLink
            to="/dashboard/favourites"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
            ❤️ Favourites Biodata
          </NavLink>
          </>}
          {user && role === 'admin' && <>
          <NavLink
            to="/dashboard/admindashboard"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
          Admin DashBoard
          </NavLink>
          
          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
          Manage Users
          </NavLink>
          <NavLink
            to="/dashboard/approvedPremium"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
          ApprovedPremium
          </NavLink>
          <NavLink
            to="/dashboard/approvedContactRequest"
            className={({ isActive }) =>
              isActive
                ? "text-[#AD1457] font-semibold"
                : "text-gray-600 hover:text-[#E91E63]"
            }
          >
          Approved Contact Request
          </NavLink>

        </>}

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
        <div className=" ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
