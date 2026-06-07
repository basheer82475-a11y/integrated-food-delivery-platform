import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";
import ApiError from "../utils/ApiError.js";

export const createOrderService = async (orderData, userId) => {
  const restaurant = await Restaurant.findById(orderData.restaurant);

  if (!restaurant) {
    throw new ApiError(404, "Restaurant not found");
  }

  let totalAmount = 0;

  const processedItems = await Promise.all(
    orderData.items.map(async (item) => {
      const menuItem = await Menu.findById(item.menuItem);

      if (menuItem.restaurant.toString() !== orderData.restaurant.toString()) {
        throw new ApiError(400, "Menu item does not belong to restaurant");
      }

      totalAmount += menuItem.price * item.quantity;

      return {
        menuItem: menuItem._id,

        quantity: item.quantity,

        price: menuItem.price,
      };
    }),
  );

  return await Order.create({
    user: userId,

    restaurant: orderData.restaurant,

    items: processedItems,

    totalAmount,

    deliveryAddress: orderData.deliveryAddress,

    paymentMethod: orderData.paymentMethod,
  });
};

export const getAllOrdersService = async (user) => {
  let query = {};

  if (user.role === "customer") {
    query.user = user._id;
  }

  return await Order.find(query)
    .populate("user", "name email")
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price");
};

export const getOrderByIdService = async (orderId, currentUser) => {
  const order = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (
    currentUser.role === "customer" &&
    order.user._id.toString() !== currentUser._id.toString()
  ) {
    throw new ApiError(403, "Access denied");
  }

  return order;
};

export const updateOrderStatusService = async (orderId, status) => {
  const allowedStatus = [
    "pending",

    "confirmed",

    "preparing",

    "out_for_delivery",

    "delivered",

    "cancelled",
  ];

  if (!allowedStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }

  const order = await Order.findByIdAndUpdate(
    orderId,

    {
      orderStatus: status,
    },

    {
      new: true,
      runValidators: true,
    },
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};
