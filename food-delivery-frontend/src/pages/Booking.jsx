import Navbar from "../components/Navbar";

function Booking() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Reserve Table
        </h1>

        <form className="mt-10 max-w-lg space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full p-3 bg-gray-900"
          />

          <input
            type="date"
            className="w-full p-3 bg-gray-900"
          />

          <input
            type="time"
            className="w-full p-3 bg-gray-900"
          />

          <input
            type="number"
            placeholder="Guests"
            className="w-full p-3 bg-gray-900"
          />

          <button
            className="bg-orange-500 px-6 py-3 rounded"
          >
            Reserve
          </button>

        </form>

      </div>
    </div>
  );
}

export default Booking;