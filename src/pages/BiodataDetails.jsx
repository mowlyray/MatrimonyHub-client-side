import React, { useEffect, useState,useContext } from "react";
import { useParams, useNavigate } from "react-router"; // <-- make sure it's react-router-dom
import { motion } from "framer-motion";
import axios from "axios";
import Swal from 'sweetalert2'
import { AuthContext } from "../context/AuthContext";

export default function BiodataDetails() {
  const { id } = useParams(); // matches route /biodata/:id
  const navigate = useNavigate();
  const [biodata, setBiodata] = useState(null);
  const [allBiodata, setAllBiodata] = useState([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
    const { user } = useContext(AuthContext);
  

  // Fetch all biodata and find the specific one
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await fetch("http://localhost:5000/biodatas");
        const allData = await resAll.json();
        setAllBiodata(allData);

        // Find the specific biodata by _id
        const single = allData.find((b) => b._id === id);
        const isprim=single?.isPremium
        setIsPremiumUser(isprim)
        setBiodata(single || null);
      } catch (err) {
        console.error("Error fetching biodata:", err);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!biodata) {
    return <p className="text-center py-10">Loading biodata...</p>;
  }

  // Similar biodata (same type, excluding current)
  const similar = allBiodata
    .filter((b) => b.biodataType === biodata.biodataType && b._id !== biodata._id)
    .slice(0, 3);

  const handleAddToFavourites = () => {

     const res =  axios.post("http://localhost:5000/favouritebio", {
          email: user.email,
          name: biodata.name,
          biodataId: biodata.biodataId,
          permanentAddress: biodata.permanentDivision,
          occuptaion: biodata.occupation,
        });
    console.log(res)
    Swal.fire({
  title: "Addded to the favourites !",
  icon: "success",
  draggable: true
});
  };

  const handleRequestContact = () => {
    navigate(`/checkout`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Biodata Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="shadow-lg rounded-2xl p-6 bg-white">
          {biodata.profileImage && (
            <img
              src={biodata.profileImage}
              alt={biodata.name}
              className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow"
            />
          )}

          <h2 className="text-2xl font-bold mb-4 text-center">{biodata.name || `Biodata ${biodata.biodataId}`}</h2>

          <div className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Biodata ID:</span> {biodata.biodataId}</p>
            <p><span className="font-semibold">Type:</span> {biodata.biodataType}</p>
            <p><span className="font-semibold">Age:</span> {biodata.age}</p>
            <p><span className="font-semibold">Occupation:</span> {biodata.occupation}</p>
            <p><span className="font-semibold">Permanent Division:</span> {biodata.permanentDivision}</p>

            {isPremiumUser && biodata.isPremium ? (
              <>
                <p><span className="font-semibold">Email:</span> {biodata.email || "N/A"}</p>
                <p><span className="font-semibold">Mobile:</span> {biodata.mobile || "N/A"}</p>
              </>
            ) : (
              <p className="text-red-500 italic">
                Contact info is available for premium members only.
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={handleAddToFavourites}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Favourites
            </button>

            {!isPremiumUser && (
              <button
                onClick={handleRequestContact}
                className="px-4 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100 transition"
              >
                Request Contact Information
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Similar Biodata */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Similar Biodata</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((bio) => (
              <motion.div
                key={bio._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div
                  className="p-4 bg-white shadow-md rounded-xl cursor-pointer hover:shadow-xl transition"
                  onClick={() => navigate(`/biodata/${bio._id}`)}
                >
                  {bio.profileImage && (
                    <img
                      src={bio.profileImage}
                      alt={bio.name || `Biodata ${bio.biodataId}`}
                      className="w-20 h-20 object-cover rounded-full mb-2"
                    />
                  )}
                  <h4 className="font-bold text-lg">{bio.name || `Biodata ${bio.biodataId}`}</h4>
                  <p className="text-sm text-gray-600">{bio.occupation}</p>
                  <p className="text-sm text-gray-600">Age: {bio.age}</p>
                  <p className="text-sm text-gray-600">{bio.permanentDivision}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
