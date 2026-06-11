import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Checkout() {
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cart = useMemo(() => {
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, []);

  const restaurantId = useMemo(() => {
    const first = cart[0];
    return first?.restaurantId ?? null;
  }, [cart]);

  const itemsPayload = useMemo(() => {
    // backend expects menuItem id, quantity, price
    // we store each cart row as {id, quantity?} - current UI stores one row per item
    const byId = new Map();

    for (const item of cart) {
      const id = item.id;
      const existing = byId.get(id);
      if (existing) {
        existing.quantity += 1;
      } else {
        byId.set(id, {
          menuItem: id,
          quantity: 1,
          price: Number(item.price || 0),
        });
      }
    }

    return Array.from(byId.values());
  }, [cart]);

  const totalAmount = useMemo(() => {
    return itemsPayload.reduce(
      (sum, it) => sum + Number(it.price || 0) * Number(it.quantity || 0),
      0,
    );
  }, [itemsPayload]);

  const handleCreateOrder = async () => {
    setError("");

    if (!restaurantId) {
      setError("Cart is empty or restaurant not found.");
      return;
    }

    if (!deliveryAddress.trim()) {
      setError("Delivery address is required.");
      return;
    }

    if (itemsPayload.length === 0) {
      setError("Cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        restaurant: restaurantId,
        items: itemsPayload,
        totalAmount,
        deliveryAddress,
        paymentMethod: paymentMethod === "ONLINE" ? "ONLINE" : "COD",
      };

      const res = await api.post("/orders", payload);

      const orderId = res?.data?.data?._id;
      if (!orderId) {
        throw new Error("Order created but orderId not returned.");
      }

      localStorage.setItem("lastOrderId", orderId);
      localStorage.removeItem("cart");

      navigate(`/tracking?orderId=${orderId}`);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to create order";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-5xl text-orange-500">Checkout</h1>

        <p className="mt-5 text-gray-300">
          Delivery address and order summary.
        </p>

        <div className="mt-10 bg-gray-900 rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-300">
              Delivery Address
            </label>
            <input
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full p-3 rounded bg-black border border-gray-800"
              placeholder="Enter delivery address"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm text-gray-300">
              Payment Method
            </label>

            <div className="flex gap-4 flex-wrap">
              <button
                type="button"
                onClick={() => setPaymentMethod("COD")}
                className={
                  paymentMethod === "COD"
                    ? "bg-orange-500 text-black px-4 py-2 rounded"
                    : "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                }
              >
                Cash on Delivery
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("ONLINE")}
                className={
                  paymentMethod === "ONLINE"
                    ? "bg-orange-500 text-black px-4 py-2 rounded"
                    : "bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
                }
              >
                Online
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300">Total</span>
            <span className="text-3xl text-orange-400 font-bold">
              ₹{totalAmount}
            </span>
          </div>

          {error ? (
            <div className="bg-red-900/40 border border-red-500/50 text-red-200 p-3 rounded">
              {error}
            </div>
          ) : null}

          <button
            onClick={handleCreateOrder}
            disabled={loading}
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;

