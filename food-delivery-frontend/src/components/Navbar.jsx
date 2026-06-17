import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-orange-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div>
          <Link to="/" className="text-3xl font-bold text-orange-500">
            LUXORA
          </Link>
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

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-500/10">
                <span className="text-sm">{user.name}</span>
                <span className="text-xs bg-orange-500 px-2 py-1 rounded capitalize">
                  {user.role?.replace("_", " ")}
                </span>
              </div>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="hover:text-orange-500 transition"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold transition text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-orange-500 transition"
              >
                Login
              </Link>

              <Link to="/booking">
                <button className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-semibold transition text-black">
                  Reserve Table
                </button>
              </Link>
            </>
          )}
        </div>


      </div>
    </nav>
  );
}

export default Navbar;