import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-orange-500">
            LUXORA
          </h1>
          <p className="text-xs tracking-[4px] text-gray-400">
            CULINARY EXCELLENCE
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-white">
          <Link to="/" className="hover:text-orange-500 transition">
            Home
          </Link>

          <Link to="/restaurants" className="hover:text-orange-500 transition">
            Restaurants
          </Link>

          <Link to="/hospitality" className="hover:text-orange-500 transition">
            Hospitality
          </Link>

          <Link to="/reviews" className="hover:text-orange-500 transition">
            Reviews
          </Link>

          <Link to="/contact" className="hover:text-orange-500 transition">
            Contact
          </Link>

          <Link to="/cart" className="hover:text-orange-500 transition">
            Cart
          </Link>
        </div>

        {/* Reserve Button */}
        <Link to="/booking">
          <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition text-black">
            Reserve Table
          </button>
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;