import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const ContactRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (user?.uid) {
      axios.get(`http://localhost:5000/api/contact-requests/${user.uid}`)
        .then(res => setRequests(res.data))
        .catch(() => toast.error("Failed to fetch contact requests"));
    }
  }, [user]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/contact-requests/${id}`)
      .then(() => {
        toast.success("Deleted successfully");
        setRequests(prev => prev.filter(req => req._id !== id));
      })
      .catch(() => toast.error("Failed to delete"));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-pink-600 text-center">📞 My Contact Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">#</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Biodata ID</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Mobile No</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req._id} className="hover:bg-gray-50">
                <td className="p-3 border">{idx + 1}</td>
                <td className="p-3 border">{req.biodataOwnerName}</td>
                <td className="p-3 border">{req.biodataId}</td>
                <td className="p-3 border capitalize">{req.status}</td>
                <td className="p-3 border">{req.status === 'approved' ? req.mobile : 'N/A'}</td>
                <td className="p-3 border">{req.status === 'approved' ? req.email : 'N/A'}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">No contact requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactRequest;
