import { useParams } from "react-router-dom";
import restaurants from "../data/restaurants";

function RestaurantDetails() {

  const { id } = useParams();

  const restaurant = restaurants.find(
    (r) => r.id === parseInt(id)
  );

  return (
    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        {restaurant.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {restaurant.items.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-900 p-8 rounded-2xl"
          >

            <h2 className="text-3xl font-semibold">
              {item.name}
            </h2>

            <p className="text-orange-400 mt-3 text-xl">
              ₹ {item.price}
            </p>

            <button className="mt-5 bg-orange-400 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-all">
              Add To Cart
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RestaurantDetails;