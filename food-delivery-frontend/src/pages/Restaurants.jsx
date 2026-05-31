import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";
import restaurants from "../data/restaurants";

function Restaurants() {
  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto pt-32 px-5">

        <h1 className="text-5xl font-bold text-orange-500 mb-10">
          Restaurants
        </h1>

        <div className="grid md:grid-cols-3 gap-8">

          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id}
              restaurant={restaurant}
            />
          ))}

        </div>

      </div>

    </div>
  );
}

export default Restaurants;