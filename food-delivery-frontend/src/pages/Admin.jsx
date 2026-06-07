import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#081224] border-r border-orange-500/20 p-6">
        <h1 className="text-3xl font-bold text-orange-500 mb-10">
          LUXORA
        </h1>

        <div className="space-y-4">
          <Link
            to="/admin"
            className="block p-3 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/restaurants"
            className="block p-3 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            Restaurants
          </Link>

          <Link
            to="/admin/menu"
            className="block p-3 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            Menu Items
          </Link>

          <Link
            to="/admin/orders"
            className="block p-3 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            Orders
          </Link>

          <Link
            to="/admin/reviews"
            className="block p-3 rounded-lg hover:bg-orange-500 hover:text-black transition"
          >
            Reviews
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-8">
          Admin Dashboard
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-[#081224] p-6 rounded-xl">
            <h2 className="text-3xl text-orange-500 font-bold">250</h2>
            <p>Total Orders</p>
          </div>

          <div className="bg-[#081224] p-6 rounded-xl">
            <h2 className="text-3xl text-orange-500 font-bold">₹1.2L</h2>
            <p>Total Revenue</p>
          </div>

          <div className="bg-[#081224] p-6 rounded-xl">
            <h2 className="text-3xl text-orange-500 font-bold">10</h2>
            <p>Restaurants</p>
          </div>

          <div className="bg-[#081224] p-6 rounded-xl">
            <h2 className="text-3xl text-orange-500 font-bold">520</h2>
            <p>Customers</p>
          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-[#081224] rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">
            Recent Orders
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-3">Order ID</th>
                <th className="text-left p-3">Customer</th>
                <th className="text-left p-3">Amount</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td className="p-3">#1001</td>
                <td className="p-3">Rahul</td>
                <td className="p-3">₹499</td>
                <td className="p-3 text-green-500">Delivered</td>
              </tr>

              <tr>
                <td className="p-3">#1002</td>
                <td className="p-3">Priya</td>
                <td className="p-3">₹799</td>
                <td className="p-3 text-yellow-500">Preparing</td>
              </tr>

              <tr>
                <td className="p-3">#1003</td>
                <td className="p-3">Aarav</td>
                <td className="p-3">₹349</td>
                <td className="p-3 text-blue-500">Out for Delivery</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Admin;