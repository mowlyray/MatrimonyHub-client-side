import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";

const FavouriteBiodata = () => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/favouritebio/${user.email}`
        );
        setFavourites(res.data);
      } catch {
        toast.error("Failed to load favourites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  const handleDelete = async (biodataId) => {
    try {
      await axios.delete(
        `http://localhost:5000/favouritebio/${user.email}/${biodataId}`
      );
      setFavourites(favourites.filter(f => f.biodataId !== biodataId));
      toast.success("Favourite removed");
    } catch {
      toast.error("Failed to delete favourite");
    }
  };

  if (loading) return <p>Loading favourites...</p>;
  if (favourites.length === 0)
    return <p className="text-center">You have no favourite biodata saved...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#E91E63]">
        ⭐ My Favourite Biodata
      </h2>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-pink-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Biodata ID</th>
            <th className="border px-4 py-2">Permanent Address</th>
            <th className="border px-4 py-2">Occupation</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {favourites.map((f) => (
            <tr key={f.biodataId} className="hover:bg-pink-50">
              <td className="border px-4 py-2">{f.name}</td>
              <td className="border px-4 py-2">{f.biodataId}</td>
              <td className="border px-4 py-2">{f.permanentDivision}</td>
              <td className="border px-4 py-2">{f.occupation}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(f.biodataId)}
                  className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
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

export default FavouriteBiodata;
