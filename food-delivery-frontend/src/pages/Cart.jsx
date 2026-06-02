import Navbar from "../components/Navbar";

function Cart() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">
          Shopping Cart
        </h1>

        <p className="mt-5">
          Selected food items will appear here.
        </p>
      </div>
    </div>
  );
}

export default Cart;