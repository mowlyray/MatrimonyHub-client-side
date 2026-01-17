import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // FETCH USERS (SERVER SEARCH)
  // =========================
  const fetchUsers = async (searchText = "") => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/biodatas?search=${searchText}`
      );

      // hide admins from list
      const filtered = res.data.filter((u) => u.role !== "admin");
      setUsers(filtered);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // =========================
  // MAKE ADMIN
  // =========================
  const makeAdmin = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will become admin",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Admin",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.put(`http://localhost:5000/users/${id}`, {
        role: "admin",
      });

      Swal.fire("Success", "User is now admin", "success");
      fetchUsers(search);
    } catch (err) {
      Swal.fire("Error", "Failed to make admin", "error");
    }
  };

  // =========================
  // MAKE PREMIUM
  // =========================
  const makePremium = async (id) => {
    const confirm = await Swal.fire({
      title: "Approve Premium?",
      text: "This biodata will become premium",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Approve",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.patch(
        `http://localhost:5000/api/admin/approve-premium/${id}`
      );

      Swal.fire("Success", "User is now premium", "success");
      fetchUsers(search);
    } catch (err) {
      Swal.fire("Error", "Failed to approve premium", "error");
    }
  };

  // =========================
  // SEARCH
  // =========================
  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
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
      {loading ? (
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
                  <td colSpan="4" className="p-4 text-center text-gray-500">
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

                    {/* MAKE PREMIUM (ONLY REQUESTED) */}
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
