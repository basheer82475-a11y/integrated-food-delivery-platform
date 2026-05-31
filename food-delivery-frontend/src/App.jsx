import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Experience from "./pages/Experience";
//import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/contact" element={<Contact />} />
    
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/payment" element={<Payment />} />

    </Routes>
  );
}

export default App;