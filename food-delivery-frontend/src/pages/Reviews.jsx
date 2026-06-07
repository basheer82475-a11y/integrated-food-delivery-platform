import Navbar from "../components/Navbar";

const reviews = [
  {
    id: 1,
    name: "Aarav",
    rating: 5,
    date: "2026-05-10",
    review: "Amazing service—everything was quick and well managed.",
  },
  {
    id: 2,
    name: "Sara",
    rating: 5,
    date: "2026-04-22",
    review: "Great food and friendly staff. Will book again.",
  },
  {
    id: 3,
    name: "Rahul",
    rating: 5,
    date: "2026-03-18",
    review: "Fast delivery and excellent quality. Highly recommended!",
  },
  {
    id: 4,
    name: "Meera",
    rating: 5,
    date: "2026-02-07",
    review: "Super experience from booking to service. Loved it.",
  },
  {
    id: 5,
    name: "John",
    rating: 4,
    date: "2026-01-15",
    review: "Good experience overall—clean, organized, and on time.",
  },
  {
    id: 6,
    name: "Priya",
    rating: 5,
    date: "2025-12-01",
    review: "Best hospitality services. The team handled everything perfectly.",
  },
];

function Reviews() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <h1 className="text-5xl font-bold text-orange-500 mb-4">
          Customer Reviews
        </h1>

        <div className="flex items-center gap-4 mb-10">
          <span className="text-6xl font-bold text-orange-500">4.7</span>
          <div>
            <p className="text-xl">★★★★★</p>
            <p className="text-gray-400">Based on 500+ reviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-[#081224] rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-3xl font-bold text-orange-500">500+</h2>
            <p className="text-gray-400">Orders Delivered</p>
          </div>

          <div className="bg-[#081224] rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-3xl font-bold text-orange-500">50+</h2>
            <p className="text-gray-400">Restaurants</p>
          </div>

          <div className="bg-[#081224] rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-3xl font-bold text-orange-500">4.7</h2>
            <p className="text-gray-400">Average Rating</p>
          </div>

          <div className="bg-[#081224] rounded-xl p-6 border border-orange-500/20">
            <h2 className="text-3xl font-bold text-orange-500">98%</h2>
            <p className="text-gray-400">Customer Satisfaction</p>
          </div>
        </div>

        {/* Featured Review */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-black rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold mb-3">
            ⭐ Featured Review
          </h2>

          <p className="text-lg">
            "Amazing service and excellent food quality. The ordering
            process was smooth and delivery was faster than expected."
          </p>

          <p className="font-bold mt-4">— Rahul</p>
        </div>

        {/* Rating Breakdown */}
        <div className="bg-[#081224] rounded-xl p-6 mb-12 border border-orange-500/20">
          <h2 className="text-2xl font-bold mb-6">Rating Breakdown</h2>

          <div className="space-y-4">
            <div>
              <p>★★★★★ 80%</p>
              <div className="w-full bg-gray-700 h-3 rounded">
                <div className="bg-orange-500 h-3 rounded w-[80%]"></div>
              </div>
            </div>

            <div>
              <p>★★★★ 15%</p>
              <div className="w-full bg-gray-700 h-3 rounded">
                <div className="bg-orange-500 h-3 rounded w-[15%]"></div>
              </div>
            </div>

            <div>
              <p>★★★ 5%</p>
              <div className="w-full bg-gray-700 h-3 rounded">
                <div className="bg-orange-500 h-3 rounded w-[5%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="
                bg-[#081224]
                p-6
                rounded-xl
                border
                border-orange-500/20
                transition-all
                duration-300
                hover:border-orange-500
                hover:-translate-y-2
                hover:shadow-lg
                hover:shadow-orange-500/20
              "
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${review.name}&background=ff6b00&color=fff`}
                    alt={review.name}
                    className="w-14 h-14 rounded-full"
                  />

                  <div>
                    <h3 className="font-bold text-xl">
                      {review.name}
                    </h3>

                    <p className="text-orange-500">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                </div>

                <span className="text-gray-400 text-sm">
                  {review.date}
                </span>
              </div>

              <p className="text-gray-300 leading-relaxed">
                {review.review}
              </p>
            </div>
          ))}
        </div>

        {/* Add Review Form */}
        <div className="mt-16 bg-[#081224] p-8 rounded-xl border border-orange-500/20">
          <h2 className="text-3xl font-bold mb-6 text-orange-500">
            Leave a Review
          </h2>

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-4 bg-black border border-gray-700 rounded-lg mb-4"
          />

          <textarea
            rows="5"
            placeholder="Write your review..."
            className="w-full p-4 bg-black border border-gray-700 rounded-lg mb-4"
          ></textarea>

          <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold px-8 py-3 rounded-lg transition">
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reviews;