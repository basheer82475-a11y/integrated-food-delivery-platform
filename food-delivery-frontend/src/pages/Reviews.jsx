import Navbar from "../components/Navbar";
import ReviewCard from "../components/ReviewCard";

function Reviews() {
  const reviews = [
    {
      rating: 5,
      name: "Aarav",
      review: "Amazing service—everything was quick and well managed.",
      date: "2026-05-10",
    },
    {
      rating: 4,
      name: "Sara",
      review: "Great food and friendly staff. Will book again.",
      date: "2026-04-22",
    },
    {
      rating: 5,
      name: "Rahul",
      review: "Fast delivery and excellent quality. Highly recommended!",
      date: "2026-03-18",
    },
    {
      rating: 5,
      name: "Meera",
      review: "Super experience from booking to service. Loved it.",
      date: "2026-02-07",
    },
    {
      rating: 4,
      name: "John",
      review: "Good experience overall—clean, organized, and on time.",
      date: "2026-01-15",
    },
    {
      rating: 5,
      name: "Priya",
      review: "Best hospitality services. The team handled everything perfectly.",
      date: "2025-12-01",
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">Customer Reviews</h1>

        <div className="mt-4 mt-6   text-gray-300">
          <span className="text-orange-400 text-5xl mr-4 font-semibold">4.7/5</span> • {reviews.length} reviews
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {reviews.map((r, idx) => (
            <ReviewCard
              key={`${r.name}-${idx}`}
              rating={r.rating}
              name={r.name}
              review={r.review}
              date={r.date}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;

