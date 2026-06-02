import Navbar from "../components/Navbar";

function Payment() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">
          Payment
        </h1>

        <div className="mt-6 space-y-4">

          <button className="bg-orange-500 px-6 py-3 rounded">
            UPI Payment
          </button>

          <button className="bg-orange-500 px-6 py-3 rounded block">
            Credit / Debit Card
          </button>

          <button className="bg-orange-500 px-6 py-3 rounded block">
            Cash On Delivery
          </button>

        </div>
      </div>
    </div>
  );
}

export default Payment;