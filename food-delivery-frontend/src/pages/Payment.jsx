import { useState } from "react";

function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("");

  const handlePayment = () => {
    alert(`Payment Method Selected: ${paymentMethod}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-32">
      <div className="max-w-3xl mx-auto bg-gray-900 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">
          Payment
        </h1>

        <h2 className="text-2xl mb-6">
          Select Payment Method
        </h2>

        <div className="space-y-4">

          <label className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            <span>UPI (Google Pay / PhonePe / Paytm)</span>
          </label>

          <label className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="Card"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            <span>Credit / Debit Card</span>
          </label>

          <label className="flex items-center gap-3 bg-gray-800 p-4 rounded-lg cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="COD"
              onChange={(e) =>
                setPaymentMethod(e.target.value)
              }
            />
            <span>Cash On Delivery</span>
          </label>

        </div>

        {paymentMethod === "UPI" && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter UPI ID"
              className="w-full p-3 rounded bg-gray-800"
            />
          </div>
        )}

        {paymentMethod === "Card" && (
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-3 rounded bg-gray-800"
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              className="w-full p-3 rounded bg-gray-800"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="p-3 rounded bg-gray-800"
              />

              <input
                type="password"
                placeholder="CVV"
                className="p-3 rounded bg-gray-800"
              />
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          className="w-full mt-8 bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;