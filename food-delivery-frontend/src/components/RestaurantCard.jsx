import { motion } from "framer-motion";

function RestaurantCard({ restaurant }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/10"
    >

      <img
        src={restaurant.image}
        alt=""
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <h2 className="text-2xl font-bold">
          {restaurant.name}
        </h2>

        <div className="flex justify-between mt-4 text-gray-300">

          <p>⭐ {restaurant.rating}</p>
          <p>{restaurant.delivery}</p>

        </div>

      </div>

    </motion.div>
  );
}

export default RestaurantCard;