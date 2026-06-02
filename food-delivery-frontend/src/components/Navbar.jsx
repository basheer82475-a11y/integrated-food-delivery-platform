import { Link } from "react-router-dom";

function Navbar() {
  return (

    <nav className="bg-black text-white p-5 flex justify-between">
      <h1 className="text-2xl font-bold text-orange-500">
        LUXORA
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/restaurants">Restaurants</Link>
        <Link to="/experience">Experience</Link>
        <Link to="/contact">Contact</Link>

    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div>
          <h1 className="text-4xl font-serif text-white">LUXORA</h1>
          <p className="text-[10px] tracking-[5px] text-zinc-300 mt-1">
            CULINARY EXCELLENCE
          </p>
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-10 text-sm tracking-[2px] text-white">
          <Link to="/" className="hover:text-[#c89b63]">
            HOME
          </Link>
          <Link to="/menu" className="hover:text-[#c89b63]">
            MENU
          </Link>
           <Link to="/restaurant" className="hover:text-[#c89b63]">
            RESTAURANTS
          </Link>
          <Link to="/cart" className="hover:text-[#c89b63]">
            CART
          </Link>
          <Link to="/login" className="hover:text-[#c89b63]">
            LOGIN
          </Link>
        </div>

        {/* Button */}
        <button className="bg-[#c89b63] text-black px-6 py-3 rounded-md font-semibold">
          RESERVE A TABLE
        </button>

      </div>
    </nav>
  );
}

export default Navbar;


