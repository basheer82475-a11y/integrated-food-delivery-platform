import { useEffect, useState } from "react";
import api from "../api/axios";

function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    api
      .get("/restaurants")
      .then((res) => {
        setRestaurants(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h1>Restaurants</h1>

      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <h2>{restaurant.name}</h2>
        </div>
      ))}
    </div>
  );
}

export default Restaurants;