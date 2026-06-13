import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Hospitality() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Luxury Rooms",
      description:
        "Experience world-class suites, private dining, concierge services, and unmatched comfort.",
      icon: "🏨",
    },
    {
      title: "Resorts",
      description:
        "Relax in premium resorts with infinity pools, spas, wellness centers, and scenic views.",
      icon: "🌴",
    },
    {
      title: "Banquets",
      description:
        "Elegant venues for weddings, corporate meetings, private parties, and celebrations.",
      icon: "🎉",
    },
    {
      title: "Events",
      description:
        "Professional event planning, catering, decoration, and VIP hospitality services.",
      icon: "✨",
    },
  ];

  const stats = [
    { value: "5000+", label: "Happy Guests" },
    { value: "100+", label: "Luxury Events" },
    { value: "50+", label: "Premium Resorts" },
    { value: "24/7", label: "Concierge Support" },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative px-6 md:px-16 py-24 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-orange-500">
            Luxora Hospitality
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Luxury stays, premium resorts, world-class banquets,
            and unforgettable experiences crafted exclusively for you.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/booking")}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold px-8 py-4 rounded-xl hover:scale-105 transition duration-300"
            >
              Reserve Now
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="border border-orange-500 px-8 py-4 rounded-xl hover:bg-orange-500 hover:text-black transition duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="px-6 md:px-16 py-16">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
          Our Premium Services
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-orange-500 hover:scale-105 transition duration-300 shadow-lg"
            >
              <div className="text-5xl mb-4">{service.icon}</div>

              <h3 className="text-3xl font-bold text-white">
                {service.title}
              </h3>

              <p className="mt-4 text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="px-6 md:px-16 py-16 bg-gray-950">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-12">
          Why Choose Luxora?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-black rounded-2xl p-6 border border-gray-800"
            >
              <h3 className="text-4xl font-bold text-orange-500">
                {stat.value}
              </h3>

              <p className="mt-2 text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Experience Section */}
      <div className="px-6 md:px-16 py-20 text-center">
        <h2 className="text-5xl font-bold text-orange-500">
          Experience Luxury Like Never Before
        </h2>

        <p className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg">
          Whether you're planning a romantic getaway, corporate retreat,
          luxury wedding, or exclusive event, Luxora delivers exceptional
          hospitality and unforgettable memories.
        </p>

        <button
          onClick={() => navigate("/booking")}
          className="mt-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold px-10 py-4 rounded-xl hover:scale-105 transition duration-300"
        >
          Book Your Experience
        </button>
      </div>
    </div>
  );
}

export default Hospitality;