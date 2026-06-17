import api from "../api/axios";

export const paymentApi = {
  createPaymentOrder: (orderId) =>
    api.post("/payments/create-order", { orderId }),

  verifyPayment: (payload) =>
    api.post("/payments/verify", payload),

  getPaymentStatus: (orderId) =>
    api.get(`/payments/status/${orderId}`),
};
