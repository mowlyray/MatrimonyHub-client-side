import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const ViewBiodata = () => {
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      axios
        .get(`http://localhost:5000/api/biodata/user/${user.uid}`)
        .then((res) => {
          setBiodata(res.data);
        })
        .catch((err) => {
          console.error("Error fetching biodata:", err);
        });
    }
  }, [user]);

  const handleRequestContact = () => {
    navigate(`/payment`);
  };

  if (!biodata) {
    return <div className="text-center mt-20 text-xl">Loading your biodata...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">📄 Your Biodata</h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <img
         src={biodata.profileImage}
         alt="Profile"
         className="w-64 h-84 object-cover rounded-full border-4 border-pink-500 shadow-lg"
        />

        </div>

        {/* Biodata Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 text-lg">
          <div><strong>👤 Biodata Type:</strong> {biodata.biodataType}</div>
          <div><strong>📛 Name:</strong> {biodata.name}</div>
          <div><strong>🎂 Date of Birth:</strong> {biodata.dob}</div>
          <div><strong>📏 Height:</strong> {biodata.height}</div>
          <div><strong>⚖️ Weight:</strong> {biodata.weight}</div>
          <div><strong>🔢 Age:</strong> {biodata.age}</div>
          <div><strong>💼 Occupation:</strong> {biodata.occupation}</div>
          <div><strong>🎨 Race:</strong> {biodata.race}</div>
          <div><strong>👨 Father's Name:</strong> {biodata.fatherName}</div>
          <div><strong>👩 Mother's Name:</strong> {biodata.motherName}</div>
          <div><strong>📍 Permanent Division:</strong> {biodata.permanentDivision}</div>
          <div><strong>📍 Present Division:</strong> {biodata.presentDivision}</div>
          <div><strong>💘 Expected Partner Age:</strong> {biodata.expectedPartnerAge}</div>
          <div><strong>📐 Expected Partner Height:</strong> {biodata.expectedPartnerHeight}</div>
          <div><strong>⚖️ Expected Partner Weight:</strong> {biodata.expectedPartnerWeight}</div>
          <div><strong>📧 Email:</strong> {biodata.email}</div>
          <div><strong>📱 Mobile:</strong> {biodata.mobile}</div>
        </div>
      </div>

      {/* Premium Button */}
      <div className="text-center mt-10">
        <button
          onClick={handleRequestContact}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-semibold"
        >
          💎 Make Biodata Premium
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-md text-center">
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="mb-6">Do you want to send your biodata for premium approval?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleMakePremium}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewBiodata;
