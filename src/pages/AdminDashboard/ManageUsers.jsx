import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/biodatas`);
      const alldata=res.data
      const ff2=alldata?.filter(ff=>(ff.Role!=="admin"))
      setUsers(ff2);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

   const makeAdmin =  (id) => {
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
        const response = axios.put(`http://localhost:5000/users/${id}`, {
          Role: "admin"
        });
        console.log(response)
        setUsers(users.filter((user) => user._id !== id));
      }
    });

  };



  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers(search);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name" className="border px-3 py-2 rounded w-64"/>
        <button className="bg-pink-600 text-white px-4 rounded">Search</button>
      </form>

      {loading ? <p>Loading...</p> : (
        <div className="bg-white rounded shadow">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.Role || "user"}</td>
                  <td className="p-2 space-x-2">
                    {u.role !== "admin" &&
                      <button  onClick={() => makeAdmin(u._id)} className="px-3 py-1 bg-blue-600 text-white rounded">Make Admin</button>}
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
