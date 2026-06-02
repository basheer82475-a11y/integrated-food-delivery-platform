
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="h-screen flex flex-col justify-center items-center bg-black text-white">

        <h1 className="text-7xl font-bold text-orange-500">
          LUXORA
        </h1>

        <p className="mt-5">
          Premium Food Delivery & Hospitality
        </p>

        <button
          onClick={() => navigate("/restaurants")}
          className="mt-6 bg-orange-500 px-8 py-3 rounded-full"
        >
          Explore Restaurants
        </button>

      </section>

      <Footer />
    </>
  );
}

export default Home;

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Home</h2>
        <p className="mt-2">This is the Home page.</p>
      </div>
    </div>
  );
}

export default Home;



