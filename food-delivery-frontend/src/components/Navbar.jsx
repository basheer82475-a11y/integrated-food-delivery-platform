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
      </div>
    </nav>
  );
}

export default Navbar;