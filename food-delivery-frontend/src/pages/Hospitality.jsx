import Navbar from "../components/Navbar";

function Hospitality() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Hospitality Services
        </h1>

        <p className="mt-5">
          Luxury rooms, resorts, banquets and events.
        </p>

      </div>
    </div>
  );
}

export default Hospitality;