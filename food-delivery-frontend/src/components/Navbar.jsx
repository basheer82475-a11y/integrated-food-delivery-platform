import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-xl border-b border-orange-500/20"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">

        <h1 className="text-3xl font-bold text-orange-500">
          LUXORA
        </h1>

        <div className="hidden md:flex gap-8 text-white">

          <Link to="/">Home</Link>
          <Link to="/restaurants">Restaurants</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/experience">Experience</Link>
          <Link to="/contact">Contact</Link>

        </div>

        <button className="bg-orange-500 px-5 py-2 rounded-full hover:scale-110 duration-300 shadow-lg shadow-orange-500/50">
          Reserve Table
        </button>

      </div>
    </motion.nav>
  );
}

export default Navbar;