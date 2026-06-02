
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import RestaurantDetails from "./pages/RestaurantDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import Tracking from "./pages/Tracking";
import Booking from "./pages/Booking";
import Hospitality from "./pages/Hospitality";
import Experience from "./pages/Experience";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/restaurant/:id" element={<RestaurantDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/tracking" element={<Tracking />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/hospitality" element={<Hospitality />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

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


