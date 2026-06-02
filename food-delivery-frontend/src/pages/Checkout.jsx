import Navbar from "../components/Navbar";

function Checkout() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">
          Checkout
        </h1>

        <p className="mt-5">
          Delivery address and order summary.
        </p>
      </div>
    </div>
  );
}

export default Checkout;