const menuItems = [
  // Golden Fork (1)
  {
    id: 1,
    restaurantId: 1,
    name: "Chicken Biryani",
    price: 249,
    image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?w=500"
  },
  {
    id: 2,
    restaurantId: 1,
    name: "Butter Chicken",
    price: 289,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500"
  },
  {
    id: 3,
    restaurantId: 1,
    name: "Paneer Butter Masala",
    price: 229,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=500"
  },

  // Royal Spice (2)
  {
    id: 4,
    restaurantId: 2,
    name: "Hyderabadi Biryani",
    price: 299,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500"
  },
  {
    id: 5,
    restaurantId: 2,
    name: "Chicken 65",
    price: 199,
    image: "https://images.unsplash.com/photo-1604908176997-431f55f4e4a5?w=500"
  },
  {
    id: 6,
    restaurantId: 2,
    name: "Apollo Fish",
    price: 279,
    image: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500"
  },

  // Ocean Grill (3)
  {
    id: 7,
    restaurantId: 3,
    name: "Grilled Salmon",
    price: 399,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500"
  },
  {
    id: 8,
    restaurantId: 3,
    name: "Fish Fry",
    price: 249,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500"
  },
  {
    id: 9,
    restaurantId: 3,
    name: "Prawn Biryani",
    price: 329,
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500"
  },

  // Dragon Wok (4)
  {
    id: 10,
    restaurantId: 4,
    name: "Chicken Noodles",
    price: 199,
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=500"
  },
  {
    id: 11,
    restaurantId: 4,
    name: "Veg Fried Rice",
    price: 169,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500"
  },
  {
    id: 12,
    restaurantId: 4,
    name: "Chicken Momos",
    price: 149,
    image: "https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500"
  },

  // Burger Haven (5)
  {
    id: 13,
    restaurantId: 5,
    name: "Classic Burger",
    price: 149,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
  },
  {
    id: 14,
    restaurantId: 5,
    name: "Cheese Burger",
    price: 199,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
  },
  {
    id: 15,
    restaurantId: 5,
    name: "French Fries",
    price: 99,
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500"
  },

  // Pizza Palace (6)
  {
    id: 16,
    restaurantId: 6,
    name: "Margherita Pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
  },
  {
    id: 17,
    restaurantId: 6,
    name: "Pepperoni Pizza",
    price: 349,
    image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?w=500"
  },
  {
    id: 18,
    restaurantId: 6,
    name: "Garlic Bread",
    price: 119,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500"
  },

  // Luxury Bites (7)
  {
    id: 19,
    restaurantId: 7,
    name: "BBQ Chicken",
    price: 349,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=500"
  },
  {
    id: 20,
    restaurantId: 7,
    name: "Lasagna",
    price: 299,
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?w=500"
  },
  {
    id: 21,
    restaurantId: 7,
    name: "Cheesecake",
    price: 149,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500"
  },

  // Moonlight Cafe (8)
  {
    id: 22,
    restaurantId: 8,
    name: "Cappuccino",
    price: 119,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500"
  },
  {
    id: 23,
    restaurantId: 8,
    name: "Cold Coffee",
    price: 99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500"
  },
  {
    id: 24,
    restaurantId: 8,
    name: "Chocolate Brownie",
    price: 129,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=500"
  },

  // Arabian Nights (9)
  {
    id: 25,
    restaurantId: 9,
    name: "Chicken Shawarma",
    price: 149,
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500"
  },
  {
    id: 26,
    restaurantId: 9,
    name: "Mandi",
    price: 349,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500"
  },
  {
    id: 27,
    restaurantId: 9,
    name: "Falafel",
    price: 129,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=500"
  },

  // South Kitchen (10)
  {
    id: 28,
    restaurantId: 10,
    name: "Masala Dosa",
    price: 99,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
  },
  {
    id: 29,
    restaurantId: 10,
    name: "Idli",
    price: 59,
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=500"
  },
  {
    id: 30,
    restaurantId: 10,
    name: "Vada",
    price: 49,
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=500"
  }
];

export default menuItems;