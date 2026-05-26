function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50">

      <div className="flex justify-between items-center px-16 py-8">

        {/* Logo */}
        <div>

          <h1 className="text-5xl font-serif text-white">
            LUXORA
          </h1>

          <p className="text-[10px] tracking-[5px] text-zinc-300 mt-2">
            CULINARY EXCELLENCE
          </p>

        </div>

        {/* Menu */}
        <div className="hidden lg:flex gap-12 text-sm tracking-[2px] text-white">

          <a href="#">HOME</a>
          <a href="#">RESTAURANT</a>
          <a href="#">MENU</a>
          <a href="#">CATERING</a>
          <a href="#">EXPERIENCE</a>
          <a href="#">CONTACT</a>

        </div>

        {/* Button */}
        <button className="bg-[#c89b63] text-black px-8 py-4 rounded-md font-semibold">
          RESERVE A TABLE
        </button>

      </div>

    </nav>
  );
}

export default Navbar;