import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ApprovedPremium() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/premium-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    Swal.fire({
      title: "Approve Premium?",
      text: "This biodata will be marked as premium",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Make Premium",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.patch(
          `http://localhost:5000/api/admin/approve-premium/${id}`
        );

        Swal.fire("Approved!", "Biodata is now premium.", "success");

        // remove from list
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-pink-600 mb-6">
        Premium Approval Requests
      </h1>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500">Loading requests...</p>
      )}

      {/* No Requests */}
      {!loading && requests.length === 0 && (
        <div className="bg-white shadow rounded-lg p-10 text-center">
          <p className="text-xl text-gray-500 font-semibold">
            No premium approval requests found
          </p>
        </div>
      )}

      {/* Requests Table */}
      {!loading && requests.length > 0 && (
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-pink-100">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-center font-semibold">
                  Biodata ID
                </th>
                <th className="px-4 py-3 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr
                  key={r._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.email}</td>
                  <td className="px-4 py-3 text-center">{r.biodataId}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => approve(r._id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold"
                    >
                      Make Premium
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
