import React, { useState } from "react";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  /* =========================
     FETCH USERS (SERVER SEARCH)
  ========================== */
  const {
    data: users = [],
    isLoading,
  } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/biodatas?search=${search}`
      );

      // hide admins
      return res.data.filter((u) => u.role !== "admin");
    },
  });

  /* =========================
     MAKE ADMIN
  ========================== */
  const makeAdminMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.put(`/users/${id}`, {
        role: "admin",
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "User is now admin", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to make admin", "error");
    },
  });

  const makeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will become admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    });

    if (confirm.isConfirmed) {
      makeAdminMutation.mutate(id);
    }
  };

  /* =========================
     MAKE PREMIUM
  ========================== */
  const makePremiumMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.patch(
        `/api/admin/approve-premium/${id}`
      );
    },
    onSuccess: () => {
      Swal.fire("Success", "User is now premium", "success");
      queryClient.invalidateQueries(["users"]);
    },
    onError: () => {
      Swal.fire("Error", "Failed to approve premium", "error");
    },
  });

  const makePremium = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Premium?",
      text: "This biodata will become premium",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });

    if (confirm.isConfirmed) {
      makePremiumMutation.mutate(id);
    }
  };

  /* =========================
     SEARCH
  ========================== */
  const handleSearch = (e) => {
    e.preventDefault();
    queryClient.invalidateQueries(["users"]);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by username"
          className="border px-3 py-2 rounded w-64"
        />
        <button className="bg-pink-600 text-white px-4 rounded">
          Search
        </button>
      </form>

      {/* TABLE */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-center">Role</th>
                <th className="p-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="p-4 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-center">
                    {u.role || "user"}
                  </td>

                  <td className="p-2 text-center space-x-2">
                    {/* MAKE ADMIN */}
                    {u.role !== "admin" && (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Make Admin
                      </button>
                    )}

                    {/* MAKE PREMIUM */}
                    {u.premiumRequested && !u.isPremium && (
                      <button
                        onClick={() => makePremium(u._id)}
                        className="px-3 py-1 bg-pink-600 text-white rounded"
                      >
                        Make Premium
                      </button>
                    )}

                    {/* ALREADY PREMIUM */}
                    {u.isPremium && (
                      <span className="px-3 py-1 text-green-600 font-semibold">
                        Premium
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
