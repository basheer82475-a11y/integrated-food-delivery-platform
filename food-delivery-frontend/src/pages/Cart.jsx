import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("cart");
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  }, [cart]);

  const removeAt = (index) => {
    const next = [...cart];
    next.splice(index, 1);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500 font-bold">Shopping Cart</h1>

        <p className="mt-5 text-gray-300">
          Selected food items will appear here.
        </p>

        {cart.length === 0 ? (
          <div className="mt-10 bg-gray-900 rounded-xl p-6">
            <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>

            <p className="mt-3 text-gray-400">
              Add delicious food items from restaurants to see them here.
            </p>

            <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg transition">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 bg-gray-900 rounded-xl p-6">
              <h2 className="text-2xl font-semibold">Your Items</h2>

              <div className="mt-5 space-y-4">
                {cart.map((item, idx) => (
                  <div
                    key={`${item.id}-${idx}`}
                    className="flex items-center justify-between gap-4 bg-black/20 border border-gray-800 rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : null}
                      <div>
                        <div className="font-semibold">{item.name}</div>
                        <div className="text-gray-300">₹{item.price}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeAt(idx)}
                      className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-semibold">Total</h2>
              <div className="mt-4 text-3xl text-orange-400 font-bold">₹{total}</div>

              <p className="mt-2 text-gray-300 text-sm">
                Taxes and delivery fees may apply at checkout.
              </p>

              <button className="mt-6 w-full bg-orange-500 hover:bg-orange-400 px-6 py-3 rounded-lg transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;


