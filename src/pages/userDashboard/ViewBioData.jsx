import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router";

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:5000/api/biodata/user/${user.uid}`)
        .then((res) => {
          setBiodata(res.data);
          setLoading(false);
        })
        .catch(() => {
          setBiodata(null);
          setLoading(false);
        });
    }
  }, [user]);

  const handleMakePremium = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/biodata/request-premium/${biodata._id}`
      );

      toast.success(res.data.message || "Premium request sent to admin");

      // ✅ client-side state update
      setBiodata({ ...biodata, premiumRequested: true });

      setShowModal(false);
    } catch (err) {
      toast.info(err.response?.data?.message || "Request already sent");
      setShowModal(false);
    }
  };

  /* =========================
     LOADING STATE
  ========================== */
  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">
        Loading your biodata...
      </p>
    );
  }

  /* =========================
     NO BIODATA FOUND
  ========================== */
  if (!biodata) {
    return (
      <div className="max-w-xl mx-auto mt-20 bg-white p-10 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold text-pink-600 mb-4">
          No Biodata Found
        </h2>

        <p className="text-gray-600 mb-6">
          You haven’t created your biodata yet.
          Please create your biodata to make your profile visible.
        </p>

        <Link
          to="/dashboard/edit-biodata"
          className="inline-block px-8 py-3 rounded-full text-white font-semibold
                     bg-gradient-to-r from-pink-500 to-purple-600
                     hover:scale-105 transition-transform shadow-md"
        >
          Create Biodata Now
        </Link>
      </div>
    );
  }

  /* =========================
      VIEW BIODATA
  ========================== */
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-4xl font-semibold text-center mb-8 text-pink-600">
        Your Biodata
      </h2>

      {/* Main Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 grid md:grid-cols-3 gap-8 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <div className="relative p-1 rounded-full animate-border">
            <div className="bg-white rounded-full p-1">
              <img
                src={biodata.profileImage}
                alt="Profile"
                className="w-56 h-56 rounded-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4 text-gray-700 text-sm">
          <p><b>Biodata Type:</b> {biodata.biodataType}</p>
          <p><b>Name:</b> {biodata.name}</p>
          <p><b>Date of Birth:</b> {biodata.dob}</p>
          <p><b>Age:</b> {biodata.age}</p>
          <p><b>Height:</b> {biodata.height}</p>
          <p><b>Weight:</b> {biodata.weight}</p>
          <p><b>Occupation:</b> {biodata.occupation}</p>
          <p><b>Race:</b> {biodata.race}</p>
          <p><b>Father's Name:</b> {biodata.fatherName}</p>
          <p><b>Mother's Name:</b> {biodata.motherName}</p>
          <p><b>Permanent Division:</b> {biodata.permanentDivision}</p>
          <p><b>Present Division:</b> {biodata.presentDivision}</p>
          <p><b>Expected Age:</b> {biodata.expectedPartnerAge}</p>
          <p><b>Expected Height:</b> {biodata.expectedPartnerHeight}</p>
          <p><b>Expected Weight:</b> {biodata.expectedPartnerWeight}</p>
          <p><b>Email:</b> {biodata.email}</p>
          <p><b>Mobile:</b> {biodata.mobile}</p>
        </div>
      </div>

      {/* Premium Button */}
      <div className="text-center mt-10">
        <button
          disabled={biodata.isPremium || biodata.premiumRequested}
          onClick={() => setShowModal(true)}
          className={`px-10 py-4 rounded-full text-white font-semibold text-lg 
            shadow-lg
            ${
              biodata.isPremium
                ? "bg-green-600 cursor-not-allowed"
                : biodata.premiumRequested
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-transform"
            }
          `}
        >
          {biodata.isPremium
            ? "Already Premium"
            : biodata.premiumRequested
            ? "Request Pending"
            : "Make Biodata Premium"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center z-50">
          <div className="modal-card">
            <h3 className="text-2xl font-semibold mb-3 text-pink-600">
              Confirm Premium Request
            </h3>

            <p className="mb-6 text-gray-600 text-sm">
              Are you sure you want to make your biodata premium?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleMakePremium}
                className="px-6 py-2 rounded-full text-white 
                           bg-gradient-to-r from-green-500 to-emerald-600 
                           hover:scale-105 transition"
              >
                Yes, Confirm
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>
        {`
          .animate-border {
            background: linear-gradient(270deg, #ec4899, #8b5cf6, #ec4899);
            background-size: 600% 600%;
            animation: borderMove 4s ease infinite;
          }

          @keyframes borderMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .modal-overlay {
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(6px);
          }

          .modal-card {
            background: rgba(255, 255, 255, 0.95);
            padding: 2rem;
            border-radius: 1.25rem;
            width: 380px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
        `}
      </style>
    </div>
  );
};

export default ViewBiodata;
