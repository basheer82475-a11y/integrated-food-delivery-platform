import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import restaurants from "../data/restaurants";
import menuItems from "../data/menuItems";
import Navbar from "../components/Navbar";

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const restaurant = useMemo(
    () => restaurants.find((r) => r.id === Number(id)),
    [id]
  );

  const items = useMemo(
    () => menuItems.filter((item) => item.restaurantId === Number(id)),
    [id]
  );

  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  });

  const addToCart = (item) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: item.restaurantId,
      image: item.image,
    };

    const raw = localStorage.getItem("cart");
    const existing = raw ? JSON.parse(raw) : [];

    const next = Array.isArray(existing) ? [...existing, cartItem] : [cartItem];
    localStorage.setItem("cart", JSON.stringify(next));
    setCartCount(next.length);
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-5xl text-orange-500">{restaurant?.name}</h1>

          <button
            onClick={() => navigate("/cart")}
            className="bg-gray-900 border border-gray-800 px-4 py-2 rounded text-gray-200 hover:bg-gray-800 transition"
            aria-label="Go to cart"
          >
            Cart: {cartCount}
          </button>
        </div>

        <p className="mt-4">⭐ {restaurant?.rating}</p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="mt-2">₹{item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="bg-orange-500 px-4 py-2 mt-4 rounded hover:bg-orange-400 transition"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantDetails;

