// Payment.jsx
import React, { useState, useEffect, use } from "react";
import Modal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { FaCrown, FaRocket, FaHandshake } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
const stripePromise = loadStripe(import.meta.env.VITE_publish_key); // Must be a valid publishable key

Modal.setAppElement("#root");

const Payment = () => {
  const [isMember, setIsMember] = useState(false);
  const [postCount, setPostCount] = useState();
  // const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {user} = use(AuthContext);
  const navigate = useNavigate();

  const membershipFee = 5;

  useEffect(() => {
    if (user?.email) {
      fetch(`https://b11-a12-server.vercel.app/users`)
        .then(res => res.json())
        .then(data => {
          const matched = data?.find(para => para.email === user.email);
          if (matched) {
            if (matched.membership === 'no') {
              setIsMember(false);
            } else {
              setIsMember(true); 
            }
            setPostCount(parseInt(matched.postCount))
          } else {
            setIsMember(false); 
          }
        })
    }
  }, [user]);

  const handleOpenModal = () => setModalIsOpen(true);

  const handlePaymentSuccess = () => {
    // setPaymentSuccess(true);
    setIsMember(true);
//      axios.put(`https://b11-a12-server.vercel.app/users/membership/${user.email}`, {
//   membership: "yes",
// });
    setModalIsOpen(false);
  };

  const handleAddToFavourites = () => {
    navigate(`/dashboard/contacts`);
  };

  return (
    <div className="bg-gradient-to-bl from-blue-500 to-violet-300 p-16">
      {
        isMember?  (
          <>
          <div className="flex items-center justify-center min-h-screen  p-4">
      <div className="bg-white shadow-lg rounded-2xl border-t-4 border-yellow-300 w-full max-w-xl text-center p-6 space-y-6">
        {/* Crown Icon */}
        <div className="text-yellow-500 text-5xl flex justify-center">
          <FaCrown />
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Contact Request successful <span className="inline-block animate-pulse">✨</span>
        </h1>
        <button
              onClick={handleAddToFavourites}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back
            </button>
      </div>
    </div>
    </>
        ):(     
      <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">For Request Contact Information pay $5</h2>
              <button onClick={handleOpenModal} className="btn bg-pink-400 text-white rounded-2xl p-2 cursor-pointer">
                Pay Now
              </button>
            
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Payment Modal"
        className="max-w-md md:min-w-md lg:min-w-lg mx-auto mt-20 bg-white p-6 rounded shadow-md"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-4 text-green-400">Complete Payment</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
        </Elements>
      </Modal>
      </>
       )
      }
    </div>
  );
};

export default Payment;
