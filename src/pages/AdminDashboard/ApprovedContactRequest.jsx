import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ApprovedContactRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact-requests")
      .then((res) => setRequests(res.data));
  }, []);

  const handleApprove = async (id) => {
    await axios.patch(
      `http://localhost:5000/api/contact-request/approve/${id}`
    );

    setRequests(
      requests.map((r) =>
        r._id === id ? { ...r, status: "approved" } : r
      )
    );

    Swal.fire("Approved", "Contact request approved", "success");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Approved Contact Requests</h2>

      <table className="w-full border">
        <thead className="bg-green-100">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Biodata ID</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id} className="text-center border-t">
              <td>{r.name || "N/A"}</td>
              <td>{r.requesterEmail}</td>
              <td>{r.biodataId}</td>
              <td>
                {r.status === "approved" ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <button
                    onClick={() => handleApprove(r._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Pending
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApprovedContactRequest;
