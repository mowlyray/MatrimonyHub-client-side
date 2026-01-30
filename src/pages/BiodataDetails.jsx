import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";

const BiodataDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  /* =========================
     🔹 BIODATA DETAILS QUERY
  ========================== */
  const {
    data: biodataRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["biodata-details", id, user?.email],
    enabled: !!id && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/api/biodata/details/${id}?email=${user.email}`
      );
      return res.data;
    },
  });

  /* =========================
     🔹 FAVOURITES QUERY
  ========================== */
  const { data: favourites = [] } = useQuery({
    queryKey: ["favourites", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favouritebio/${user.email}`);
      return res.data;
    },
  });

  /* =========================
     🔹 ALL BIODATAS (SIMILAR)
  ========================== */
  const { data: allBiodatas = [] } = useQuery({
    queryKey: ["all-biodatas"],
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading biodata...</p>;
  if (error || !biodataRes?.biodata) return <p className="text-center py-10">Biodata not found</p>;

  const { biodata, canSeeContact } = biodataRes;
  const isFavourite = favourites.find(f => f.biodataId === biodata.biodataId);
  const similarBiodata = allBiodatas
    .filter(b => b.biodataType === biodata.biodataType && b._id !== biodata._id)
    .slice(0, 3);
  const isOwnBiodata = biodata.email === user.email;

  /* =========================
     🔹 ACTIONS
  ========================== */
  const handleAddToFavourites = async () => {
    try {
      await axiosSecure.post("/favouritebio", {
        userEmail: user.email,
        biodataId: biodata.biodataId,
        name: biodata.name,
        permanentDivision: biodata.permanentDivision,
        occupation: biodata.occupation,
      });
      Swal.fire("Success!", "Added to favourites", "success");
      setTimeout(() => navigate("/dashboard/favourites"), 1200);
    } catch (err) {
      Swal.fire("Info", err.response?.data?.message || "Already added", "info");
    }
  };

  const handleRequestContact = () => navigate(`/checkout/${biodata.biodataId}`);

  return (
    <div className="bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 min-h-screen py-10 px-4 md:px-6 lg:px-8">

      {/* MAIN BIODATA */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-3xl shadow-md hover:shadow-pink-300/40 p-8 relative overflow-hidden transition-shadow duration-300">
          {/* Decorative gradient circle */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>

          <img
            src={biodata.profileImage}
            alt={biodata.name}
            className="w-44 h-44 rounded-full mx-auto object-cover shadow-sm border-4 border-pink-200 mb-6"
          />

          <h2 className="md:text-2xl text-xl font-bold text-center text-[#E91E63] mb-4">
            {biodata.name}
          </h2>

          <div className="space-y-3 text-gray-700 text-center md:text-left">
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

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {!isOwnBiodata && (
              <button
                onClick={handleAddToFavourites}
                disabled={isFavourite}
                className={`px-5 py-2 rounded-full text-white font-semibold transition duration-300 ${
                  isFavourite ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
                }`}
              >
                {isFavourite ? "Added to Favourites" : "Add to Favourites"}
              </button>
            )}

            {!isOwnBiodata && !canSeeContact && (
              <button
                onClick={handleRequestContact}
                className="px-5 py-2 border-2 border-pink-600 rounded-full text-pink-600 font-semibold hover:bg-pink-50 transition duration-300"
              >
                Request Contact Information
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* SIMILAR BIODATA */}
      {similarBiodata.length > 0 && (
        <div className="max-w-5xl mx-auto mt-14">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center text-[#E91E63]">
            Similar {biodata.biodataType} Biodata
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarBiodata.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-pink-300/40 transition transform hover:-translate-y-1 duration-300 relative overflow-hidden"
              >
                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-200 rounded-full opacity-20 blur-2xl"></div>

                <img
                  src={item.profileImage}
                  alt={item.name}
                  className="w-28 h-28 rounded-full mx-auto object-cover mb-4 border-2 border-pink-200 shadow-sm"
                />

                <h4 className="text-lg md:text-xl font-semibold text-center text-[#E91E63]">
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
                    className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition duration-300"
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
