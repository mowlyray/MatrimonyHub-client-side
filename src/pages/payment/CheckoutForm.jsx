import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const CheckoutForm = () => {
  const { biodataId } = useParams();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);

  // Create payment intent
  useEffect(() => {
    axios
      .post("http://localhost:5000/api/create-payment-intent", { amount: 5 })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user.email,
          },
        },
      }
    );

    if (error) {
      setProcessing(false);
      Swal.fire("Payment Failed", error.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      await axios.post("http://localhost:5000/api/contact-request", {
        biodataId,
        requesterEmail: user.email,
        paymentIntentId: paymentIntent.id,
        amount: 5,
      });

      Swal.fire({
        title: "Success 🎉",
        text: "Your contact request has been sent to admin",
        icon: "success",
        confirmButtonColor: "#ec4899",
      });
    }

    setProcessing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-rose-600 mb-2">
          Request Contact Information
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Secure payment to unlock contact details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Biodata ID */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Biodata ID
            </label>
            <input
              value={biodataId}
              readOnly
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
            />
          </div>

          {/* User Email */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Your Email
            </label>
            <input
             value={user?.email || ""}
              readOnly
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-100 text-gray-600 focus:outline-none"
            />
          </div>

          {/* Stripe Card */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Card Information
            </label>
            <div className="mt-1 p-3 border rounded-lg focus-within:ring-2 focus-within:ring-rose-400 transition">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#374151",
                      "::placeholder": { color: "#9ca3af" },
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            disabled={!stripe || processing}
            className="w-full mt-4 py-3 rounded-lg font-semibold text-white 
              bg-gradient-to-r from-pink-500 to-rose-500 
              hover:from-pink-600 hover:to-rose-600 
              active:scale-95 transition-all duration-300
              disabled:opacity-50 disabled:cursor-not-allowed
              shadow-lg"
          >
            {processing ? "Processing..." : "Pay $5 & Send Request"}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-xs text-center text-gray-400 mt-5">
          Payment is secure & handled by Stripe
        </p>
      </div>
    </div>
  );
};

export default CheckoutForm;
