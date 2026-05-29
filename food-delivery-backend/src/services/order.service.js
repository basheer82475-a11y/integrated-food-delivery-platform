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

      if (!menuItem) {
        throw new ApiError(404, "Menu item not found");
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

export const getAllOrdersService = async () => {
  return await Order.find()
    .populate("user", "name email")
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price");
};

export const getOrderByIdService = async (orderId) => {
  const order = await Order.findById(orderId)
    .populate("user", "name email")
    .populate("restaurant", "name")
    .populate("items.menuItem", "name price");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};

export const updateOrderStatusService = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(
    orderId,

    {
      orderStatus: status,
    },

    {
      new: true,
    },
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return order;
};
