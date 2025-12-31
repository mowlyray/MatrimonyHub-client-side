import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const FavouriteBiodata = () => {
  const { user } = useContext(AuthContext);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchFavourites = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/favouritebio`);
        const alldata=res.data
        const favdata=alldata.filter((b) => b.email === user.email);
        setFavourites(favdata);
      } catch (error) {
        console.error("Failed to fetch favourites", error);
        toast.error("Failed to load favourites");
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, [user]);

  const handleDelete = async (biodataId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/favouritebio/${biodataId}`);
      if (res.status === 200) {
        toast.success("Favourite removed");
        setFavourites(favourites.filter(item => item.biodataId !== biodataId));
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete favourite");
    }
  };

  if (loading) return <p>Loading favourites...</p>;

  if (favourites?.length === 0) return <p className="text-center">You have no favourite biodata saved...</p>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-[#E91E63]">⭐ My Favourite Biodata</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-pink-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Biodata ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Permanent Address</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Occupation</th>
            <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {favourites?.map(({ name, biodataId, permanentAddress, occuptaion }) => (
            <tr key={biodataId} className="hover:bg-pink-50">
              <td className="border border-gray-300 px-4 py-2">{name}</td>
              <td className="border border-gray-300 px-4 py-2">{biodataId}</td>
              <td className="border border-gray-300 px-4 py-2">{permanentAddress}</td>
              <td className="border border-gray-300 px-4 py-2">{occuptaion}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  onClick={() => handleDelete(biodataId)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold px-3 py-1 rounded"
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
