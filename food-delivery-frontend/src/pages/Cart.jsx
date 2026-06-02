
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

function Cart() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Cart</h2>
        <p className="mt-2">This is the Cart page.</p>

      </div>
    </div>
  );
}


export default Cart;
