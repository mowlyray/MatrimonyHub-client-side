import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext, useState } from "react";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from './../../context/AuthContext';

const GotMarried = () => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);


  const handleRating = (value) => {
    setRating(value);
    setValue("rating", value);
  };

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:5000/api/success-story", {
        ...data,
        rating,
        userEmail: user.email, 
      });

      // ✅ Success alert (center)
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your success story has been submitted successfully. Please visit the Home page to see your story in the Success Stories section.",
        confirmButtonColor: "#ec4899",
      });

      reset();
      setRating(0);
    } catch (error) {
      // 🔒 already submitted case
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "info",
          title: "Already Submitted",
          text: "You have already shared your success story.",
          confirmButtonColor: "#ec4899",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to submit success story. Please try again.",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-8">
        💖Got Married – Share Your Story
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input
          {...register("selfBiodataId", { required: true })}
          placeholder="Your Biodata ID"
          className="input"
        />

        <input
          {...register("partnerBiodataId", { required: true })}
          placeholder="Partner Biodata ID"
          className="input"
        />

        <input
          {...register("image", { required: true })}
          placeholder="Couple Image URL"
          className="input"
        />

        {/* ⭐ STAR RATING */}
        <div>
          <p className="mb-2 font-medium text-gray-700">Your Rating</p>
          <div className="flex gap-2 text-2xl cursor-pointer">
            {[1, 2, 3, 4, 5].map((value) => (
              <FaStar
                key={value}
                onClick={() => handleRating(value)}
                className={
                  value <= rating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
          </div>
        </div>

        <textarea
          {...register("storyText", { required: true })}
          rows="4"
          placeholder="Share your feelings and experience using MatrimonyHub..."
          className="input"
        />

        <button
          type="submit"
          disabled={rating === 0}
          className={`w-full py-3 rounded-full font-semibold text-lg transition
            ${
              rating === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105"
            }
          `}
        >
          Submit Success Story
        </button>
      </form>

      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          outline: none;
        }

        .input:focus {
          border-color: #ec4899;
          box-shadow: 0 0 0 3px rgba(236,72,153,0.25);
        }
      `}</style>
    </div>
  );
};

export default GotMarried;
