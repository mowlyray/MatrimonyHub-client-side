import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const BiodataDetails = () => {
  const { id } = useParams(); // /biodata/:id
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similarBiodata, setSimilarBiodata] = useState([]);
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [loading, setLoading] = useState(true);

  // ============================
  // Fetch biodata details (SECURE)
  // ============================
  useEffect(() => {
    const fetchBiodataDetails = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get biodata details (server decides contact visibility)
        const res = await axios.get(
          `http://localhost:5000/api/biodata/details/${id}?email=${user?.email}`
        );

        setBiodata(res.data.biodata);
        setIsPremiumUser(res.data.canSeeContact);

        // 2️⃣ Fetch similar biodata
        const allRes = await axios.get("http://localhost:5000/biodatas");
        const similar = allRes.data
          .filter(
            (b) =>
              b.biodataType === res.data.biodata.biodataType &&
              b._id !== res.data.biodata._id
          )
          .slice(0, 3);

        setSimilarBiodata(similar);
      } catch (error) {
        console.error("Failed to load biodata:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchBiodataDetails();
    }
  }, [id, user?.email]);

  // ============================
  // Add to favourites
  // ============================
  const handleAddToFavourites = async () => {
    try {
      await axios.post("http://localhost:5000/favouritebio", {
        userEmail: user.email,
        biodataId: biodata.biodataId,
        name: biodata.name,
        permanentDivision: biodata.permanentDivision,
        occupation: biodata.occupation,
      });

      Swal.fire("Success!", "Added to favourites", "success");
    } catch (err) {
      Swal.fire("Error", "Already added or failed", "error");
    }
  };

  // ============================
  // Request contact info
  // ============================
  const handleRequestContact = () => {
    navigate(`/checkout/${biodata.biodataId}`);
  };

  if (loading) {
    return <p className="text-center py-10">Loading biodata...</p>;
  }

  if (!biodata) {
    return <p className="text-center py-10">Biodata not found</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ================= Biodata Details ================= */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="w-40 h-40 rounded-full mx-auto object-cover shadow mb-4"
          />

          <h2 className="text-2xl font-bold text-center mb-4">
            {biodata.name || `Biodata ${biodata.biodataId}`}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p><b>Biodata ID:</b> {biodata.biodataId}</p>
            <p><b>Type:</b> {biodata.biodataType}</p>
            <p><b>Age:</b> {biodata.age}</p>
            <p><b>Occupation:</b> {biodata.occupation}</p>
            <p><b>Permanent Division:</b> {biodata.permanentDivision}</p>

            {/* Contact info */}
            {isPremiumUser ? (
              <>
                <p><b>Email:</b> {biodata.email}</p>
                <p><b>Mobile:</b> {biodata.mobile}</p>
              </>
            ) : (
              <p className="text-red-500 italic">
                Contact information is only available for premium members.
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button
              onClick={handleAddToFavourites}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Add to Favourites
            </button>

            {!isPremiumUser && (
              <button
                onClick={handleRequestContact}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Request Contact Information
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* ================= Similar Biodata ================= */}
      {similarBiodata.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Similar Biodata</h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {similarBiodata.map((bio) => (
              <motion.div
                key={bio._id}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-4 rounded-xl shadow cursor-pointer"
                onClick={() => navigate(`/biodata/${bio._id}`)}
              >
                <img
                  src={bio.profileImage}
                  alt={bio.name}
                  className="w-20 h-20 rounded-full object-cover mb-2"
                />
                <h4 className="font-bold">{bio.name}</h4>
                <p className="text-sm">{bio.occupation}</p>
                <p className="text-sm">Age: {bio.age}</p>
                <p className="text-sm">{bio.permanentDivision}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataDetails;
