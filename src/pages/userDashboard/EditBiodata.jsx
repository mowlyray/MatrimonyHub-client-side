import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const divisions = ["Dhaka", "Chattagra", "Rangpur", "Barisal", "Khulna", "Mymensingh", "Sylhet"];
const heights = ["4'5\"", "4'6\"", "5'0\"", "5'5\"", "6'0\""];
const weights = ["45kg", "50kg", "55kg", "60kg", "65kg"];
const occupations = ["Student", "Engineer", "Doctor", "Teacher", "Business"];
const races = ["Fair", "Dark", "Brown"];

const EditBiodata = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { user } = useContext(AuthContext);
  const [biodataId, setBiodataId] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  /* ===============================
     LOAD USER BIODATA
  =============================== */
  const { isLoading } = useQuery({
    queryKey: ["my-biodata", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/biodatas");
      const single = res.data.find(b => b.email === user.email);
      if (single) {
        setBiodataId(single);
        reset(single);
      }
      return single;
    },
  });

  /* ===============================
     CREATE / UPDATE BIODATA
  =============================== */
  const biodataMutation = useMutation({
    mutationFn: async (formData) => {
      if (biodataId) {
        return axiosSecure.put(`/api/biodata/${biodataId._id}`, {
          ...formData,
          userId: user.uid,
          email: user.email,
        });
      } else {
        return axiosSecure.post("/api/biodata", {
          ...formData,
          userId: user.uid,
          email: user.email,
        });
      }
    },
    onSuccess: (res) => {
      if (biodataId) {
        if (res.data.updateResult?.modifiedCount > 0) {
          toast.success("Biodata updated successfully");
        } else {
          toast.info("No changes were made");
        }
      } else {
        toast.success("Biodata created successfully");
        reset();
        navigate("/dashboard/view-biodata");
      }
    },
    onError: () => {
      toast.error("Error saving biodata");
    },
  });

  const onSubmit = (data) => {
    biodataMutation.mutate(data);
  };

  if (isLoading) return null;

  return (
    <div className="min-h-screen px-4">
      <div className="max-w-4xl mx-auto animated-border rounded-3xl p-[2px]">
        <div className="bg-white rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-semibold text-center text-pink-600 mb-12">
            {biodataId ? "✏️ Update Your Biodata" : "📝 Create Your Biodata"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-14">

            {/* 👤 PERSONAL INFO */}
            <Section title="👤 Personal Information">
              <Select register={register("biodataType")} options={["Male", "Female"]} placeholder="Select Gender" />
              <Input register={register("name")} placeholder="Full Name" />
              <Input register={register("profileImage")} placeholder="Profile Image URL" />
              <Input register={register("dob")} type="date" />
              <Select register={register("height")} options={heights} placeholder="Height" />
              <Select register={register("weight")} options={weights} placeholder="Weight" />
              <Input register={register("age")} type="number" placeholder="Age" />
              <Select register={register("occupation")} options={occupations} placeholder="Occupation" />
              <Select register={register("race")} options={races} placeholder="Skin Color" />
              <Input register={register("fatherName")} placeholder="Father's Name" />
              <Input register={register("motherName")} placeholder="Mother's Name" />
            </Section>

            {/* 📍 LOCATION */}
            <Section title="📍 Location Information">
              <Select register={register("permanentDivision")} options={divisions} placeholder="Permanent Division" />
              <Select register={register("presentDivision")} options={divisions} placeholder="Present Division" />
            </Section>

            {/* 💕 PARTNER */}
            <Section title="💕 Partner Preferences">
              <Input register={register("expectedPartnerAge")} type="number" placeholder="Expected Partner Age" />
              <Select register={register("expectedPartnerHeight")} options={heights} placeholder="Expected Height" />
              <Select register={register("expectedPartnerWeight")} options={weights} placeholder="Expected Weight" />
            </Section>

            {/* 📞 CONTACT */}
            <Section title="📞 Contact Information">
              <input value={user.email} readOnly className="input bg-gray-100" />

              <div>
                <input
                  type="text"
                  placeholder="Mobile Number (11 digits)"
                  className="input"
                  {...register("mobile", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]{11}$/,
                      message: "Mobile number must be exactly 11 digits",
                    },
                  })}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.mobile.message}
                  </p>
                )}
              </div>
            </Section>

            {/* SUBMIT */}
            <div className="text-center pt-8">
              <button
                type="submit"
                disabled={biodataMutation.isPending}
                className="px-14 py-4 rounded-full text-white font-semibold text-lg
                           bg-gradient-to-r from-pink-500 to-purple-600
                           hover:scale-105 transition shadow-xl"
              >
                {biodataMutation.isPending
                  ? "Saving..."
                  : biodataId
                  ? "Update Biodata"
                  : "Save & Publish Now"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .animated-border {
          background: linear-gradient(270deg, #ec4899, #8b5cf6, #f472b6);
          background-size: 600% 600%;
          animation: borderGlow 5s ease infinite;
        }
        @keyframes borderGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          outline: none;
          transition: all 0.3s;
        }
        .input:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236,72,153,0.25);
        }
      `}</style>
    </div>
  );
};

/* ===== Helper Components ===== */

const Section = ({ title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md border grid md:grid-cols-2 gap-6">
    <h3 className="md:col-span-2 text-xl font-semibold text-gray-700 mb-2 border-b pb-2">
      {title}
    </h3>
    {children}
  </div>
);

const Input = ({ register, placeholder, type = "text" }) => (
  <input {...register} required type={type} placeholder={placeholder} className="input" />
);

const Select = ({ register, options, placeholder }) => (
  <select {...register} required className="input">
    <option value="">{placeholder}</option>
    {options.map(opt => <option key={opt}>{opt}</option>)}
  </select>
);

export default EditBiodata;
