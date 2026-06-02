import { Link } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
      <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition">

        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">
          <h2 className="text-orange-500 text-xl font-bold">
            {restaurant.name}
          </h2>

          <p>⭐ {restaurant.rating}</p>
          <p>{restaurant.delivery}</p>
        </div>

      </div>
    </Link>
  );
}

export default RestaurantCard;