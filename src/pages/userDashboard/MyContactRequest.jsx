import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: requests = [] } = useQuery({
    queryKey: ["my-contact-requests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/my-contact-requests/${user.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/api/contact-request/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["my-contact-requests", user.email]);
      Swal.fire("Deleted", "Request removed", "success");
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-pink-50 via-rose-50 to-white min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-[#E91E63] text-center">
        My Contact Requests
      </h2>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-pink-300">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
            <tr>
              <th className="py-3 px-4 border border-pink-300">Name</th>
              <th className="py-3 px-4 border border-pink-300">Biodata ID</th>
              <th className="py-3 px-4 border border-pink-300">Status</th>
              <th className="py-3 px-4 border border-pink-300">Mobile</th>
              <th className="py-3 px-4 border border-pink-300">Email</th>
              <th className="py-3 px-4 border border-pink-300">Action</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr
                key={r._id}
                className="text-center hover:bg-pink-50 transition"
              >
                <td className="py-3 px-4 border border-pink-200 text-gray-700 font-medium">
                  {r.name || "N/A"}
                </td>

                <td className="py-3 px-4 border border-pink-200 text-gray-600">
                  {r.biodataId}
                </td>

                <td
                  className={`py-3 px-4 border border-pink-200 font-semibold ${
                    r.status === "approved"
                      ? "text-green-600"
                      : "text-orange-500"
                  }`}
                >
                  {r.status}
                </td>

                <td className="py-3 px-4 border border-pink-200">
                  {r.status === "approved" ? (
                    <span className="text-gray-700">{r.mobile}</span>
                  ) : (
                    <span className="italic text-gray-400">Hidden</span>
                  )}
                </td>

                <td className="py-3 px-4 border border-pink-200">
                  {r.status === "approved" ? (
                    <span className="text-gray-700">{r.email}</span>
                  ) : (
                    <span className="italic text-gray-400">Hidden</span>
                  )}
                </td>

                <td className="py-3 px-4 border border-pink-200">
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="
                      bg-gradient-to-r from-rose-400 to-pink-500
                      hover:from-rose-500 hover:to-pink-600
                      text-white px-4 py-1.5 rounded-full
                      shadow-md hover:shadow-lg transition
                    "
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {requests.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="py-10 text-center text-gray-400 italic border border-pink-200"
                >
                  No contact requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyContactRequest;
