import { useState } from "react";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    tableType: "Standard",
    request: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Table Reserved Successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-orange-500 mb-4">
          Reserve Your Exclusive Dining Experience
        </h1>

        <p className="text-gray-300 max-w-2xl mx-auto">
          Enjoy premium dining, VIP seating, and unforgettable hospitality
          at Luxora.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">

        {/* Booking Form */}
        <div className="bg-white/10 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-orange-400 mb-6">
            Book a Table
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            />

            <div className="grid grid-cols-2 gap-4">

              <input
                type="date"
                name="date"
                onChange={handleChange}
                className="p-4 rounded-xl bg-black/40 border border-gray-700"
              />

              <input
                type="time"
                name="time"
                onChange={handleChange}
                className="p-4 rounded-xl bg-black/40 border border-gray-700"
              />
            </div>

            <input
              type="number"
              name="guests"
              placeholder="Number of Guests"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            />

            <select
              name="tableType"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            >
              <option>Standard</option>
              <option>VIP</option>
              <option>Private Dining Room</option>
            </select>

            <textarea
              rows="4"
              name="request"
              placeholder="Special Requests"
              onChange={handleChange}
              className="w-full p-4 rounded-xl bg-black/40 border border-gray-700"
            />

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 font-bold text-black hover:scale-105 transition duration-300"
            >
              Reserve Table
            </button>

          </form>
        </div>

        {/* Reservation Summary */}
        <div className="bg-white/10 backdrop-blur-lg border border-orange-500/20 rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-orange-400 mb-6">
            Reservation Summary
          </h2>

          <div className="space-y-4 text-lg">

            <div className="flex justify-between">
              <span>Name</span>
              <span>{formData.name || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Date</span>
              <span>{formData.date || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Time</span>
              <span>{formData.time || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Guests</span>
              <span>{formData.guests || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span>Table Type</span>
              <span>{formData.tableType}</span>
            </div>

            <hr className="border-gray-700 my-6" />

            <div className="bg-orange-500/20 p-6 rounded-2xl">
              <h3 className="text-xl font-bold text-orange-400 mb-2">
                VIP Experience
              </h3>

              <p className="text-gray-300">
                Enjoy premium service, priority seating,
                and an unforgettable culinary journey.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}