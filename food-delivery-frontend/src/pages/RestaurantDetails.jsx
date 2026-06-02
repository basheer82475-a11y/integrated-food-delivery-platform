import { useParams } from "react-router-dom";
import restaurants from "../data/restaurants";
import menuItems from "../data/menuItems";
import Navbar from "../components/Navbar";

function RestaurantDetails() {
  const { id } = useParams();

  const restaurant = restaurants.find(
    (r) => r.id === Number(id)
  );

  const items = menuItems.filter(
    (item) => item.restaurantId === Number(id)
  );

  return (
    <div className="bg-black min-h-screen text-white">

      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          {restaurant?.name}
        </h1>

        <p className="mt-4">
          ⭐ {restaurant?.rating}
        </p>

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

                <h2 className="text-xl font-bold">
                  {item.name}
                </h2>

                <p className="mt-2">
                  ₹{item.price}
                </p>

                <button className="bg-orange-500 px-4 py-2 mt-4 rounded">
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