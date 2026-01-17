import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similarBiodata, setSimilarBiodata] = useState([]);
  const [canSeeContact, setCanSeeContact] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiodataDetails = async () => {
      try {
        setLoading(true);

        // biodata details
        const res = await axios.get(
          `http://localhost:5000/api/biodata/details/${id}?email=${user?.email}`
        );

        setBiodata(res.data.biodata);
        setCanSeeContact(res.data.canSeeContact);

        // check favourites
        const favRes = await axios.get(
          `http://localhost:5000/favouritebio/${user.email}`
        );

        const exists = favRes.data.find(
          (f) => f.biodataId === res.data.biodata.biodataId
        );
        if (exists) setIsFavourite(true);

        // fetch similar biodata
        const allRes = await axios.get("http://localhost:5000/biodatas");

        const similar = allRes.data
          .filter(
            (b) =>
              b.biodataType === res.data.biodata.biodataType &&
              b._id !== res.data.biodata._id
          )
          .slice(0, 3);

        setSimilarBiodata(similar);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchBiodataDetails();
    }
  }, [id, user?.email]);

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
      setIsFavourite(true);

      setTimeout(() => {
        navigate("/dashboard/favourites");
      }, 1200);
    } catch (err) {
      Swal.fire(
        "Info",
        err.response?.data?.message || "Already added",
        "info"
      );
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${biodata.biodataId}`);
  };

  if (loading) {
    return <p className="text-center py-10">Loading biodata...</p>;
  }

  if (!biodata) {
    return <p className="text-center py-10">Biodata not found</p>;
  }

  // 🔹 NEW: check own biodata
  const isOwnBiodata = biodata?.email === user?.email;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Biodata */}
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
            {biodata.name}
          </h2>

          <div className="space-y-2 text-gray-700">
            <p><b>Biodata ID:</b> {biodata.biodataId}</p>
            <p><b>Type:</b> {biodata.biodataType}</p>
            <p><b>Age:</b> {biodata.age}</p>
            <p><b>Height:</b> {biodata.height}</p>
            <p><b>Weight:</b> {biodata.weight}</p>
            <p><b>Occupation:</b> {biodata.occupation}</p>
            <p><b>Permanent Division:</b> {biodata.permanentDivision}</p>
            <p><b>Present Division:</b> {biodata.presentDivision}</p>
            <p><b>Father's Name:</b> {biodata.fatherName}</p>
            <p><b>Mother's Name:</b> {biodata.motherName}</p>

            {canSeeContact ? (
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

          {/* 🔹 Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {/* Add to favourites – only if NOT own biodata */}
            {!isOwnBiodata && (
              <button
                onClick={handleAddToFavourites}
                disabled={isFavourite}
                className={`px-4 py-2 rounded text-white ${
                  isFavourite
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isFavourite ? "Added to Favourites" : "Add to Favourites"}
              </button>
            )}

            {/* Request contact – only if NOT own biodata & NOT premium */}
            {!isOwnBiodata && !canSeeContact && (
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

      {/* Similar Biodata */}
      {similarBiodata.length > 0 && (
        <div className="max-w-5xl mx-auto mt-14">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Similar {biodata.biodataType} Biodata
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBiodata.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition"
              >
                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover mb-3"
                />

                <h4 className="text-lg font-semibold text-center">
                  {item.name}
                </h4>

                <div className="text-sm text-gray-600 text-center space-y-1 mt-2">
                  <p><b>Age:</b> {item.age}</p>
                  <p><b>Division:</b> {item.permanentDivision}</p>
                  <p><b>Occupation:</b> {item.occupation}</p>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => navigate(`/biodata/${item._id}`)}
                    className="px-4 py-1.5 bg-pink-600 text-white rounded hover:bg-pink-700"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BiodataDetails;
