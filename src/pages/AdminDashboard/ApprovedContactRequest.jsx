import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ApprovedContactRequest() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/admin/contactRequests");
    setRequests(res.data);
  };

  useEffect(() => { fetchRequests(); }, []);

  const approve = async (requestId) => {
    try {
      await axios.post(`http://localhost:5000/admin/contactRequests/${requestId}/approve`);
      fetchRequests();
    } catch (err) { console.error(err); }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Contact Requests</h1>
      <div className="bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Biodata Id</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(r => (
              <tr key={r._id} className="border-t">
                <td className="p-2">{r.requesterName}</td>
                <td className="p-2">{r.requesterEmail}</td>
                <td className="p-2">{r.biodataId}</td>
                <td className="p-2">
                  <button onClick={()=>approve(r._id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
