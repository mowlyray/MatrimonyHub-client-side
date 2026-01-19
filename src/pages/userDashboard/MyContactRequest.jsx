import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyContactRequest = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  /* =========================
     LOAD CONTACT REQUESTS
  ========================== */
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

  /* =========================
     DELETE REQUEST
  ========================== */
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Contact Requests</h2>

      <table className="w-full border">
        <thead className="bg-pink-100">
          <tr>
            <th>Name</th>
            <th>Biodata ID</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="text-center border-t">
              <td>{r.name || "N/A"}</td>
              <td>{r.biodataId}</td>
              <td
                className={
                  r.status === "approved"
                    ? "text-green-600"
                    : "text-orange-500"
                }
              >
                {r.status}
              </td>
              <td>{r.status === "approved" ? r.mobile : "—"}</td>
              <td>{r.status === "approved" ? r.email : "—"}</td>
              <td>
                <button
                  onClick={() => handleDelete(r._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyContactRequest;
