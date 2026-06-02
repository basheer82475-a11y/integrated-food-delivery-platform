import restaurants from "../data/restaurants";
import RestaurantCard from "../components/RestaurantCard";

function Restaurants() {
  return (
    <div className="bg-black min-h-screen text-white p-10">
      <h1 className="text-5xl text-orange-500 mb-10">
        Restaurants
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
}

export default Restaurants;