import { useState, useEffect } from "react";
import api from "../api/axios";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await api.get("/restaurants");
        setRestaurants(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white p-10 flex items-center justify-center">
        <p className="text-2xl">Loading restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white p-10 flex items-center justify-center">
        <p className="text-2xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-5xl text-orange-500 mb-10">
        Restaurants
      </h1>

      {restaurants.length === 0 ? (
        <p className="text-xl">No restaurants available</p>
      ) : (
        <div className="grid md:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Restaurants;