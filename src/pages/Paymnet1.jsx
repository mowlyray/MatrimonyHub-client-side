// Payment.jsx
import React, { useState, useEffect, use } from "react";
import Modal from "react-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutForm } from "./CheckoutForm";
import { FaCrown, FaRocket, FaHandshake } from "react-icons/fa";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdPostAdd } from "react-icons/md";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";
const stripePromise = loadStripe(import.meta.env.VITE_publish_key); // Must be a valid publishable key

Modal.setAppElement("#root");

const Payment1 = () => {
  const [isMember, setIsMember] = useState(false);
  const [postCount, setPostCount] = useState();
  // const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {user} = use(AuthContext);
  const navigate = useNavigate();

  const membershipFee = 300;

  const handleAddToFavourites = () => {
    navigate(`/dashboard/view-biodata`);
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/biodatas`)
        .then(res => res.json())
        .then(data => {
          const matched = data?.find(para => para.email === user.email);
          if (matched) {
            if (matched.isPremium === 'false') {
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
     axios.put(`http://localhost:5000/users/membership/${user.email}`, {
  isPremium: "pending",
});
    setModalIsOpen(false);
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
          Youre  premium Membership Request successful <span className="inline-block animate-pulse">✨</span>
        </h1>
        <p className="text-orange-600 font-semibold text-lg">
          Enjoy your premium benefits!
        </p>
        <button
              onClick={handleAddToFavourites}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Back
            </button>

        {/* Benefits List */}
        {/* <div className="bg-yellow-50 p-6 rounded-xl shadow-inner text-left">
          <ul className="space-y-4 text-gray-700 text-md md:text-lg">
            <li className="flex items-center gap-3">
              <BsPatchCheckFill className="text-yellow-400" />
              <span>Gold badge next to your name</span>
            </li>
            <li className="flex items-center gap-3">
              <MdPostAdd className="text-pink-500" />
              <span>Post more than 5 times</span>
            </li>
            <li className="flex items-center gap-3">
              <FaRocket className="text-red-500" />
              <span>Boosted visibility in the community</span>
            </li>
            <li className="flex items-center gap-3">
              <FaHandshake className="text-yellow-600" />
              <span>Access to exclusive forums</span>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
    </>
        ):(     
      <>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Become a Premium member Member</h2>
              <button onClick={handleOpenModal} className="btn bg-green-400 p-2 rounded-2xl text-white">
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
        <h2 className="text-lg font-bold mb-4 text-primary">Complete Payment</h2>
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

export default Payment1;
