import React from "react";
import RestaurantCard from "./RestaurantCard";

export default function RestaurantList({ restaurants, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {(restaurants || []).map((r) => (
        <RestaurantCard
          key={r.id ?? r._id}
          restaurant={r}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}



