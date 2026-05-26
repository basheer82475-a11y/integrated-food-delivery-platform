import Navbar from "./components/Navbar";
import bg from "./assets/luxora.png";

function App() {
  return (
    <div className="h-screen overflow-hidden bg-black text-white">

      <Navbar />

      {/* Full Hero Image */}
      <div className="relative w-full h-screen">

        <img
          src={bg}
          alt="luxury-food"
          className="w-full h-full object-cover"
        />

      </div>

    </div>
  );
}

export default App;