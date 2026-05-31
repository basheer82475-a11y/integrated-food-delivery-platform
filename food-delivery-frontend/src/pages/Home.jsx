import Navbar from "../components/Navbar";
import heroBg from "../assets/luxora.png";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-black text-white overflow-hidden">

      <Navbar />

      <section
        className="h-screen relative flex flex-col justify-center items-center text-center"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl md:text-9xl font-bold text-orange-500 z-10"
        >
          LUXORA
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-6 text-xl md:text-2xl text-gray-300 z-10"
        >
          Premium Luxury Food & Hospitality Experience
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-6 mt-10 z-10"
        >

          <button className="px-8 py-4 bg-orange-500 rounded-full hover:scale-110 duration-300 shadow-lg shadow-orange-500/40">
            Order Now
          </button>

          <button className="px-8 py-4 border border-orange-500 rounded-full hover:bg-orange-500 duration-300">
            Explore Menu
          </button>

        </motion.div>

      </section>

    </div>
  );
}

export default Home;