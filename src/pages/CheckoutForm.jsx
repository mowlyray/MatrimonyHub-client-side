
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";

export const CheckoutForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    
    axios
      .post("https://b11-a12-server.vercel.app/create-payment-intent", {
        amount: 5 * 100, // 
        currency: "usd",
      })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.error("❌ Axios Error:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setProcessing(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        onPaymentSuccess();
      }
      setProcessing(false)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-success mt-4"
      >
        {processing ? "Processing..." : "Pay $5.00"}
      </button>
    </form>
  );
};
