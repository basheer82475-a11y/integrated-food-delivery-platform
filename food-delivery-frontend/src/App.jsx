import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import bg from "./assets/luxora.png";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen bg-black/60 bg-cover bg-center">
        <BrowserRouter>
         

          {/* Push content below fixed navbar */}
          <main className="pt-24">
              <Navbar />
            <Routes>
             
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="restaurant" element={<Restaurant />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;


