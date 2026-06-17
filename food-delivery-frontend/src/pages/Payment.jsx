import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { paymentApi } from "../services/payment.api.js";
import Loader from "../components/Loader";

function Payment() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!orderId) {
      toast.error("Order ID not found");
      navigate("/checkout");
      return;
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, [orderId, isAuthenticated, navigate]);

  const handlePayment = async () => {
    if (!orderId) {
      toast.error("Order ID is missing");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create payment order on backend
      const orderResponse = await paymentApi.createPaymentOrder(orderId);
      const paymentDetails = orderResponse.data.data;

      setPaymentData(paymentDetails);

      // Step 2: Initialize Razorpay checkout
      const options = {
        key: paymentDetails.keyId,
        amount: paymentDetails.amount, // Amount in paise
        currency: paymentDetails.currency,
        order_id: paymentDetails.razorpayOrderId,
        name: "Luxora",
        description: `Payment for Order ${orderId}`,
        handler: async (response) => {
          try {
            // Step 3: Verify payment on backend
            const verifyResponse = await paymentApi.verifyPayment({
              orderId,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyResponse.data.success) {
              toast.success("Payment successful!");
              localStorage.removeItem("cart");
              navigate(`/tracking?orderId=${orderId}`);
            }
          } catch (err) {
            toast.error(
              err.response?.data?.message || "Payment verification failed"
            );
          }
        },
        prefill: {
          email: "customer@luxora.com",
          contact: "9999999999",
        },
        theme: {
          color: "#ff9800",
        },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error(
        err.response?.data?.message || "Failed to initiate payment"
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">Payment</h1>

        {paymentData && (
          <div className="mb-8 bg-gray-800 rounded-lg p-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-300">Order Amount:</span>
              <span className="font-semibold">₹{(paymentData.amount / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Currency:</span>
              <span className="font-semibold">{paymentData.currency}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Order ID:</span>
              <span className="font-semibold text-xs">{paymentData.razorpayOrderId}</span>
            </div>
          </div>
        )}

        <div className="space-y-4 mb-8">
          <h2 className="text-2xl mb-6">Select Payment Method</h2>

          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg cursor-pointer hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💳</div>
              <div>
                <h3 className="font-semibold">Credit/Debit Card</h3>
                <p className="text-sm text-blue-100">
                  Visa, Mastercard, Amex
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-lg cursor-pointer hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📱</div>
              <div>
                <h3 className="font-semibold">UPI</h3>
                <p className="text-sm text-purple-100">
                  Google Pay, PhonePe, BHIM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-lg cursor-pointer hover:shadow-lg transition">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🏦</div>
              <div>
                <h3 className="font-semibold">Netbanking</h3>
                <p className="text-sm text-green-100">
                  All major Indian banks
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 py-3 rounded-lg font-semibold text-black disabled:cursor-not-allowed transition"
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        <p className="text-sm text-gray-400 mt-4 text-center">
          You will be redirected to Razorpay Secure Payment Gateway
        </p>
      </div>
    </div>
  );
}

export default Payment;