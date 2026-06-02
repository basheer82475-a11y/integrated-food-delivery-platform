import Navbar from "../components/Navbar";

function Reviews() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Customer Reviews
        </h1>

        <div className="mt-5">

          <p>⭐⭐⭐⭐⭐ Amazing service</p>
          <p>⭐⭐⭐⭐ Great food</p>
          <p>⭐⭐⭐⭐⭐ Fast delivery</p>

        </div>

      </div>
    </div>
  );
}

export default Reviews;