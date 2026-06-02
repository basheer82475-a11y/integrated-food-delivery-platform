import Navbar from "../components/Navbar";

function Tracking() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Live Order Tracking
        </h1>

        <div className="mt-10 space-y-5">

          <div>✅ Order Placed</div>
          <div>🍳 Preparing Food</div>
          <div>🛵 Out For Delivery</div>
          <div>📦 Delivered</div>

        </div>

      </div>
    </div>
  );
}

export default Tracking;