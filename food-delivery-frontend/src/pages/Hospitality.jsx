import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Hospitality() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Luxury Rooms",
      description: "Premium stays designed for comfort and privacy.",
    },
    {
      title: "Resorts",
      description: "Relax in curated spaces with top amenities.",
    },
    {
      title: "Banquets",
      description: "Perfect venues for ceremonies and corporate gatherings.",
    },
    {
      title: "Events",
      description: "From planning to execution—special moments made easy.",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">Hospitality Services</h1>
       

        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/booking")}
            className="bg-orange-500 px-6 py-3 rounded font-semibold hover:bg-orange-400 transition"
          >
            Book Now
          </button>
          <span className="text-gray-400">
            Reserve your date in a few seconds.
          </span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.title}
              className="border border-gray-800 rounded-xl p-6 bg-gray-950/40"
            >
              <h2 className="text-2xl text-white">{s.title}</h2>
              <p className="mt-2 text-gray-300">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hospitality;

