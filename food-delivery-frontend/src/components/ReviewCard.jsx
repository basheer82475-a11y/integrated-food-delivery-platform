import React from "react";

function ReviewCard({ rating = 5, name = "Guest", review = "Great experience!", date = "" }) {
  return (
    <div className="border border-gray-800 rounded-xl p-6 bg-gray-950/40">
      <div className="flex items-center justify-between gap-4">
        <div className="text-orange-400 font-semibold">{"★".repeat(rating)}{"☆".repeat(Math.max(0, 5 - rating))}</div>
        {date ? <div className="text-gray-500 text-sm">{date}</div> : null}
      </div>

      <h3 className="mt-4 text-lg">{name}</h3>
      <p className="mt-2 text-gray-300 leading-relaxed">{review}</p>
    </div>
  );
}

export default ReviewCard;

