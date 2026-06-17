import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import api from "../api/axios";
import Navbar from "../components/Navbar";

function Step({
  label,
  icon,
  active,
  done,
  connector,
}) {
  const dotCls = done
    ? "bg-orange-500 border-orange-500"
    : active
      ? "bg-orange-500/20 border-orange-500/60"
      : "bg-white/5 border-white/10";

  const textCls = done
    ? "text-orange-200"
    : active
      ? "text-white"
      : "text-gray-400";

  const connCls = done
    ? "bg-orange-500"
    : active
      ? "bg-orange-500/30"
      : "bg-white/10";

  return (
    <div className="flex gap-4">
      <div className="relative flex flex-col items-center">
        <div
          className={`h-10 w-10 rounded-full border flex items-center justify-center ${dotCls}`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        {connector ? (
          <div
            className={`mt-1 h-[34px] w-[2px] rounded-full ${connCls}`}
            aria-hidden="true"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <div className={`font-semibold ${textCls}`}>{label}</div>
        <div className="mt-1 text-xs text-gray-400">
          {done ? "Completed" : active ? "In progress" : "Pending"}
        </div>
      </div>
    </div>
  );
}

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

  const statusLabel = useMemo(() => {
    if (!status) return "pending";
    return String(status)
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }, [status]);


  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="pt-24 px-6 pb-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl text-orange-500 font-semibold">
                  Live Order Tracking
                </h1>
                <p className="text-gray-300">
                  Follow your order in real-time. Updates are reflected automatically.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-400">Order</div>
                <div className="px-3 py-2 rounded-lg bg-white/5 border border-orange-500/20 text-white font-semibold text-sm sm:text-base max-w-[240px] truncate">
                  {orderId || "—"}
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="bg-gray-900/60 border border-white/10 rounded-xl p-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-orange-500" />
                <p className="text-gray-200">Loading order...</p>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="bg-red-900/40 border border-red-500/50 text-red-200 rounded-xl p-4 mb-6">
              {error}
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <div className="bg-gray-900/60 border border-white/10 rounded-xl p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs tracking-[0.35em] uppercase text-zinc-400">
                      Status Timeline
                    </p>
                    <h2 className="text-xl font-semibold">Order progress</h2>
                  </div>

                  <div className="px-3 py-2 rounded-lg bg-orange-500/10 border border-orange-500/30">
                    <span className="text-xs text-gray-300">Current</span>
                    <div className="text-orange-200 font-semibold">
                      {statusLabel}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-6">
                  <Step
                    label="Order Placed"
                    icon="✅"
                    done={progress.placed && status !== "cancelled"}
                    active={progress.placed && status !== "cancelled"}
                    connector
                  />
                  <Step
                    label="Preparing Food"
                    icon="🍳"
                    done={progress.preparing && status !== "cancelled"}
                    active={progress.preparing && status !== "cancelled"}
                    connector
                  />
                  <Step
                    label="Out For Delivery"
                    icon="🛵"
                    done={progress.out && status !== "cancelled"}
                    active={progress.out && status !== "cancelled"}
                    connector
                  />
                  <Step
                    label="Delivered"
                    icon="📦"
                    done={progress.delivered && status === "delivered"}
                    active={status === "delivered"}
                  />
                </div>

                {order ? (
                  <div className="mt-6 text-sm text-gray-300">
                    <div>
                      <span className="text-gray-400">Order Status:</span>{" "}
                      <span className="text-white font-semibold">
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-900/60 border border-white/10 rounded-xl p-6">
                <p className="text-xs tracking-[0.35em] uppercase text-zinc-400">
                  Order Details
                </p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Status</span>
                    <span className="text-white font-semibold">{statusLabel}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Payment</span>
                    <span className="text-white font-semibold">
                      {order?.paymentMethod || order?.payment?.method || "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Total</span>
                    <span className="text-white font-semibold">
                      {order?.totalAmount != null ? `₹${order.totalAmount}` : "—"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <span className="text-gray-400">Restaurant</span>
                    <span className="text-white font-semibold truncate">
                      {order?.restaurant?.name || order?.restaurantName || "—"}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <p className="text-sm text-gray-300 mb-2">Delivery Address</p>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {order?.deliveryAddress || order?.address || "—"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Tip: Keep this page open while your order is being processed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracking;


