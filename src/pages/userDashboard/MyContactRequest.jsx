import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyContactRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios
      .get(`http://localhost:5000/api/my-contact-requests/${user.email}`)
      .then((res) => setRequests(res.data));
  }, [user]);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/contact-request/${id}`);
    setRequests(requests.filter((r) => r._id !== id));
    Swal.fire("Deleted", "Request removed", "success");
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
              <td className={r.status === "approved" ? "text-green-600" : "text-orange-500"}>
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
