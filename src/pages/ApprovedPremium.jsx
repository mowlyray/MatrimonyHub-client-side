import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ApprovedPremium() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/biodatas");
      const alldata=res.data
      const reques=alldata.filter(rew=>(rew.isPremium==="pending"))
      setRequests(reques);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const approve = async (email) => {
Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes,Make Admin!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Done!",
          text: "Make Admin is successfull!!",
          icon: "success"
        });
        
        axios.put(`http://localhost:5000/users/membership/${email}`, {
  isPremium: "true",})
        setRequests(requests.filter((ema) => ema.email !== email));
      }
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Premium Requests</h1>
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
                <td className="p-2">{r.name}</td>
                <td className="p-2">{r.email}</td>
                <td className="p-2">{r.biodataId}</td>
                <td className="p-2">
                  <button onClick={()=>approve(r.email)} className="px-3 py-1 bg-green-600 text-white rounded">Make Premium</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
