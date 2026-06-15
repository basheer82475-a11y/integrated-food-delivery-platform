import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  // Default Unsplash image URLs for different restaurants
  const defaultImages = {
    "Pizza Hub": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    "Food Paradise": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    "default": "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop"
  };

  // Use restaurant-specific image or default
  const imageUrl = defaultImages[restaurant.name] || defaultImages["default"];

  return (
    <Link to={`/restaurant/${restaurant._id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition">
        <img
          src={imageUrl}
          alt={restaurant.name}
          className="w-full h-52 object-cover"
          onError={(e) => {
            // Final fallback if Unsplash fails
            const fallback = "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=300&fit=crop";
            if (e.target.src !== fallback) {
              e.target.src = fallback;
            }
          }}
        />

        <div className="p-4">
          <h2 className="text-orange-500 text-xl font-bold">
            {restaurant.name}
          </h2>

          <p>⭐ {restaurant.rating || 0}</p>
          <p>{restaurant.deliveryTime || 30} mins</p>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;