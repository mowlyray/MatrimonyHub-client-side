import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { motion } from "framer-motion";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  /* FETCH USERS */
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`/biodatas?search=${search}`);
      return res.data.filter((u) => u.role !== "admin");
    },
  });

  /*  MAKE ADMIN */
  const makeAdminMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.put(`/users/${id}`, { role: "admin" }),
    onSuccess: () => {
      Swal.fire("Success", "User is now admin", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const makeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will become admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E91E63",
    });

    if (confirm.isConfirmed) {
      makeAdminMutation.mutate(id);
    }
  };

  /*  MAKE PREMIUM */
  const makePremiumMutation = useMutation({
    mutationFn: async (id) =>
      axiosSecure.patch(`/api/admin/approve-premium/${id}`),
    onSuccess: () => {
      Swal.fire("Success", "User is now premium", "success");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const makePremium = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Premium?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#E91E63",
    });

    if (confirm.isConfirmed) {
      makePremiumMutation.mutate(id);
    }
  };

  /*   SEARCH */
  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      {/* HEADING */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-[#AD1457] mb-8"
      >
        Manage Users
        <span className="block w-24 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto mt-2 rounded-full"></span>
      </motion.h1>

      {/* SEARCH */}
      <motion.form
        onSubmit={handleSearch}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex justify-center gap-3 mb-8"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username"
          className="px-4 py-2 w-72 rounded-xl border border-pink-200
                     focus:outline-none focus:ring-4 focus:ring-pink-300/40"
        />
        <button
          className="px-6 py-2 rounded-xl text-white font-semibold
                     bg-gradient-to-r from-pink-500 to-rose-500
                     hover:scale-105 transition-transform shadow-lg"
        >
          Search
        </button>
      </motion.form>

      {/* TABLE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl
                   border border-pink-100 overflow-hidden"
      >
        {isLoading ? (
          <div className="p-10 text-center text-pink-500 font-semibold animate-pulse">
            Loading users...
          </div>
        ) : (
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gradient-to-r from-pink-100 to-rose-100">
              <tr className="border-b border-pink-200">
                <th className="p-4 text-left border-r border-pink-200">
                  Name
                </th>
                <th className="p-4 text-left border-r border-pink-200">
                  Email
                </th>
                <th className="p-4 text-center border-r border-pink-200">
                  Role
                </th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-6 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((u, index) => (
                <motion.tr
                  key={u._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-pink-100
                             hover:bg-pink-50/60
                             hover:border-pink-200
                             transition-all duration-300"
                >
                  <td className="p-4 font-medium border-r border-pink-100">
                    {u.name}
                  </td>
                  <td className="p-4 text-gray-600 border-r border-pink-100">
                    {u.email}
                  </td>
                  <td className="p-4 text-center capitalize border-r border-pink-100">
                    {u.role || "user"}
                  </td>

                  <td className="p-4 text-center space-x-2">
                    {u.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        className="px-4 py-1.5 rounded-full text-white text-xs
                                   bg-blue-600 hover:bg-blue-700
                                   transition shadow-md"
                      >
                        Make Admin
                      </button>
                    )}

                    {u.premiumRequested && !u.isPremium && (
                      <button
                        onClick={() => makePremium(u._id)}
                        className="px-4 py-1.5 rounded-full text-white text-xs
                                   bg-pink-600 hover:bg-pink-700
                                   transition shadow-md"
                      >
                        Make Premium
                      </button>
                    )}

                    {u.isPremium && (
                      <span
                        className="px-4 py-1.5 rounded-full text-xs
                                   bg-green-100 text-green-700 font-semibold"
                      >
                        Premium
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
};

export default ManageUsers;
