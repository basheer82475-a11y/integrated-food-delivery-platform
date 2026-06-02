import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-5 mt-10">

          <div className="bg-gray-900 p-5 rounded">
            Total Orders
          </div>

          <div className="bg-gray-900 p-5 rounded">
            Revenue
          </div>

          <div className="bg-gray-900 p-5 rounded">
            Customers
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;