import Navbar from "../components/Navbar";

function Cart() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500 font-bold">
          Shopping Cart
        </h1>

        <p className="mt-5 text-gray-300">
          Selected food items will appear here.
        </p>

        <div className="mt-10 bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-semibold">
            Your Cart is Empty
          </h2>

          <p className="mt-3 text-gray-400">
            Add delicious food items from restaurants to see them here.
          </p>

          <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg transition">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
