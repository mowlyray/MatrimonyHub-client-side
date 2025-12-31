import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const divisions = ["Dhaka", "Chattagra", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const heights = ["4'5\"", "4'6\"", "5'0\"", "5'5\"", "6'0\""];
const weights = ["45kg", "50kg", "55kg", "60kg", "65kg"];
const occupations = ["Student", "Engineer", "Doctor", "Teacher", "Business"];
const races = ["Fair", "Dark", "Brown"];

const EditBiodata = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const [biodataId, setBiodataId] = useState(null);
  const [idCount, setIdCount] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (biodataId) {
        // Update existing biodata
        const res = await axios.put(`http://localhost:5000/api/biodata/${biodataId?._id}`, {
          ...data,
          userId: user.uid,
          email: user.email,
        });

        if (res.status === 200 && res.data.updateResult?.modifiedCount > 0) {
          toast.success("✅ Biodata updated successfully");
        } else {
          toast.info("ℹ️ No changes were made.");
        }
      } else {
        // Create new biodata
        const res = await axios.post("http://localhost:5000/api/biodata", {
          ...data,
          userId: user.uid,
          email: user.email,
          isPremium: "false",
          biodataId: idCount,
        });

        if (res.status === 201 || res.status === 200) {
          toast.success("✅ Biodata created successfully");
          reset(); // reset form only on create
          navigate("/dashboard/view-biodata");
        }
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("❌ Error saving biodata");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAll = await fetch("http://localhost:5000/allbiodata");
        const allData = await resAll.json();
        // console.log(allData.length)
        setIdCount(allData.length+1)
        const single = allData.find((b) => b.email === user.email);
        if (single) {
          setBiodataId(single);
          reset(single); // ✅ this sets all default values automatically
        }
      } catch (err) {
        console.error("Error fetching biodata:", err);
      }
    };

    if (user.email) fetchData();
  }, [user.email, reset]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200 ">
      <h2 className="text-4xl font-bold text-center text-[#E91E63] mb-10">
        {biodataId ? "✏️ Update Your Biodata" : "📝 Create Your Biodata"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 text-[16px]">
        {/* Personal Information */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">
            👤 Personal Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Biodata Type *</label>
              <select {...register("biodataType")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name *</label>
              <input {...register("name")} required placeholder="Your Full Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Profile Image Link *</label>
              <input {...register("profileImage")} required placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Date of Birth *</label>
              <input type="date" {...register("dob")} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Height *</label>
              <select {...register("height")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {heights.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Weight *</label>
              <select {...register("weight")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {weights.map(w => <option key={w}>{w}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Age *</label>
              <input type="number" {...register("age")} required placeholder="Age"
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Occupation *</label>
              <select {...register("occupation")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {occupations.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Skin Color *</label>
              <select {...register("race")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {races.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Father's Name *</label>
              <input {...register("fatherName")} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Mother's Name *</label>
              <input {...register("motherName")} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </section>

        {/* Location */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">📍 Location</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Permanent Division *</label>
              <select {...register("permanentDivision")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {divisions.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Present Division *</label>
              <select {...register("presentDivision")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {divisions.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Partner Preferences */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">💞 Partner Preferences</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Expected Partner Age *</label>
              <input type="number" {...register("expectedPartnerAge")} required
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Expected Partner Height *</label>
              <select {...register("expectedPartnerHeight")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {heights.map(h => <option key={h}>{h}</option>)}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Expected Partner Weight *</label>
              <select {...register("expectedPartnerWeight")} required className="w-full px-4 py-2 border border-gray-300 rounded-md">
                <option value="">Select</option>
                {weights.map(w => <option key={w}>{w}</option>)}
              </select>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 border-b pb-2">📞 Contact Info</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input value={user.email} readOnly
                className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100" />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Mobile Number *</label>
              <input {...register("mobile")} required placeholder="01XXXXXXXXX"
                className="w-full px-4 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </section>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#E91E63] hover:bg-[#AD1457] text-white font-bold px-12 py-3 rounded-full transition duration-300 shadow-lg"
          >
            {loading ? "Saving..." : (biodataId ? "💾 Update Biodata" : "💾 Save & Publish Now")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
