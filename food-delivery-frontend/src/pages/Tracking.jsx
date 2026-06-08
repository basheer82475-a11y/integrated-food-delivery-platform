import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Tracking() {
  const location = useLocation();

  const orderId = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("orderId") || localStorage.getItem("lastOrderId");
  }, [location.search]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Order ID not found. Place an order first.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await api.get(`/orders/${orderId}`);
        setOrder(res?.data?.data ?? null);
      } catch (e) {
        setError(
          e?.response?.data?.message || e?.message || "Failed to fetch order",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const status = order?.orderStatus || "pending";

  const progress = useMemo(() => {
    switch (status) {
      case "pending":
        return { placed: true, preparing: false, out: false, delivered: false };
      case "confirmed":
      case "preparing":
        return { placed: true, preparing: true, out: false, delivered: false };
      case "out_for_delivery":
        return { placed: true, preparing: true, out: true, delivered: false };
      case "delivered":
        return { placed: true, preparing: true, out: true, delivered: true };
      case "cancelled":
        return { placed: false, preparing: false, out: false, delivered: false };
      default:
        return { placed: true, preparing: false, out: false, delivered: false };
    }
  }, [status]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">Live Order Tracking</h1>

        {loading ? <p className="mt-5">Loading order...</p> : null}
        {error ? (
          <div className="mt-5 bg-red-900/40 border border-red-500/50 text-red-200 p-3 rounded">
            {error}
          </div>
        ) : null}

        <div className="mt-10 space-y-5">
          <div style={{ opacity: progress.placed ? 1 : 0.5 }}>
            ✅ Order Placed
          </div>
          <div style={{ opacity: progress.preparing ? 1 : 0.5 }}>
            🍳 Preparing Food
          </div>
          <div style={{ opacity: progress.out ? 1 : 0.5 }}>
            🛵 Out For Delivery
          </div>
          <div style={{ opacity: progress.delivered ? 1 : 0.5 }}>
            📦 Delivered
          </div>
        </div>


        {order ? (
          <div className="mt-8 text-gray-300">
            <div>
              <span className="text-gray-400">Order Status:</span>{" "}
              <span className="text-white font-semibold">{status}</span>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Tracking;

