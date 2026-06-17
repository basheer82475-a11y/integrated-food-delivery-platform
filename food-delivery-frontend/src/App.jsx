import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";

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
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import bg from "./assets/luxora.png";

function App() {
  return (
    <AuthProvider>
      <div
        className="min-h-screen text-white"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="min-h-screen bg-black/60">
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <Navbar />

          <div className="pt-24">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurants" element={<Restaurants />} />
              <Route
                path="/restaurant/:id"
                element={<RestaurantDetails />}
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
              <Route path="/tracking" element={<ProtectedRoute><Tracking /></ProtectedRoute>} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/hospitality" element={<Hospitality />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><Admin /></ProtectedRoute>} />
            </Routes>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;