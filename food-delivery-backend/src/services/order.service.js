import Order from "../models/order.model.js";
import Restaurant from "../models/restaurant.model.js";
import Menu from "../models/menu.model.js";
import ApiError from "../utils/ApiError.js";

// ==============================
// Create Order
// ==============================

export const createOrderService = async (orderData, userId) => {
  const restaurant = await Restaurant.findById(orderData.restaurant);

  if (!restaurant || !restaurant.isActive) {
    throw new ApiError(404, "Restaurant not found");
  }

  let totalAmount = 0;

  const processedItems = await Promise.all(
    orderData.items.map(async (item) => {
      const menuItem = await Menu.findById(item.menuItem);

      if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
      }

      if (!menuItem.isAvailable) {
        throw new ApiError(400, "Menu item is unavailable");
      }

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

// ==============================
// Get All Orders
// ==============================

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

// ==============================
// Get Order By Id
// ==============================

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

// ==============================
// Update Order Status
// ==============================

export const updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const transitions = {
    pending: ["confirmed", "cancelled"],

    confirmed: ["preparing", "cancelled"],

    preparing: ["out_for_delivery"],

    out_for_delivery: ["delivered"],

    delivered: [],

    cancelled: [],
  };

  const currentStatus = order.orderStatus;

  const allowedNextStatus = transitions[currentStatus];

  if (!allowedNextStatus.includes(status)) {
    throw new ApiError(
      400,
      `Cannot change order status from ${currentStatus} to ${status}`,
    );
  }

  order.orderStatus = status;

  await order.save();

  return order;
};
// ==============================
// Get My Orders (Restaurant Owner)
// ==============================

export const getMyOrdersService = async (ownerId) => {
  const restaurants = await Restaurant.find({
    owner: ownerId,
    isActive: true,
  }).select("_id");

  const restaurantIds = restaurants.map((restaurant) => restaurant._id);

  return await Order.find({
    restaurant: {
      $in: restaurantIds,
    },
  })
    .populate("user", "name email")
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price")
    .sort({
      createdAt: -1,
    });
};
