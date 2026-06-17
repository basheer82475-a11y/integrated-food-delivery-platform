import api from "../api/axios";

export const restaurantApi = {
  getRestaurants: () => api.get("/restaurants"),
  getRestaurantById: (id) => api.get(`/restaurants/${id}`),
  getMenuByRestaurantId: (id) => api.get(`/restaurants/${id}/menu`),
};

