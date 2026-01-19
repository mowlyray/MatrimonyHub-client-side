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

  if (isLoading) {
    return <p className="text-center py-10">Loading biodata...</p>;
  }

  if (error || !biodataRes?.biodata) {
    return <p className="text-center py-10">Biodata not found</p>;
  }

  const { biodata, canSeeContact } = biodataRes;

  const isFavourite = favourites.find(
    (f) => f.biodataId === biodata.biodataId
  );

  const similarBiodata = allBiodatas
    .filter(
      (b) =>
        b.biodataType === biodata.biodataType && b._id !== biodata._id
    )
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* MAIN BIODATA */}
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

          <div className="flex flex-wrap justify-center gap-3 mt-6">
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

      {/* SIMILAR BIODATA */}
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
