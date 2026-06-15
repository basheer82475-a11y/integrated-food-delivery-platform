import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function RestaurantDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const restaurantRes = await api.get(`/restaurants/${id}`);
        setRestaurant(restaurantRes.data.data);
        setError(null);

        const menuRes = await api.get(`/menus?restaurantId=${id}`);
        setItems(menuRes.data.data || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load restaurant details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurantData();
    }
  }, [id]);

  const getImageUrl = () => {
    const defaultImages = {
      "Pizza Hub": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
      "Food Paradise": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop",
      "default": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop"
    };
    
    return defaultImages[restaurant?.name] || defaultImages["default"];
  };

  const getMenuItemImageUrl = () => {
    return "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop";
  };

  const addToCart = (item) => {
    const cartItem = {
      _id: item._id,
      name: item.name,
      price: item.price,
      restaurantId: item.restaurantId || id,
      image: item.image,
    };

    const raw = localStorage.getItem("cart");
    const existing = raw ? JSON.parse(raw) : [];

    const next = Array.isArray(existing) ? [...existing, cartItem] : [cartItem];
    localStorage.setItem("cart", JSON.stringify(next));
    setCartCount(next.length);
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-2xl">Loading restaurant details...</p>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="bg-black min-h-screen text-white flex items-center justify-center">
        <p className="text-2xl text-red-500">{error || "Restaurant not found"}</p>
      </div>
    );
  }

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

        <p className="mt-4">⭐ {restaurant?.rating || 0}</p>

        {items.length === 0 ? (
          <p className="mt-10 text-xl">No menu items available</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-gray-900 rounded-xl overflow-hidden"
              >
                <img
                  src={getMenuItemImageUrl()}
                  alt={item.name}
                  className="w-full h-52 object-cover"
                  onError={(e) => {
                    const fallback = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop";
                    if (e.target.src !== fallback) {
                      e.target.src = fallback;
                    }
                  }}
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
        )}
      </div>
    </div>
  );
}

export default RestaurantDetails;

