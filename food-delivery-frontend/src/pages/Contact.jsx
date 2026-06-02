import Navbar from "../components/Navbar";

function Contact() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">
        <h1 className="text-5xl text-orange-500">Contact Us</h1>
        <p className="mt-3 text-gray-300 max-w-2xl">
          Have a question or need help? Send us a message and we’ll get back to you.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl">Message Us</h2>

            <form className="mt-5 space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded"
              />
              <textarea
                placeholder="How can we help?"
                rows={5}
                className="w-full p-3 bg-gray-900 border border-gray-800 rounded resize-none"
              />

              <button className="bg-orange-500 px-6 py-3 rounded font-semibold hover:bg-orange-400 transition">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl">Contact Details</h2>
            <div className="mt-5 space-y-3 text-gray-200">
              <p>📞 8247542849</p>
              <p>📞 7995808091</p>
              <p>📧 support@luxora.com</p>
              <p>🕒 Mon–Sat: 10:00 AM – 7:00 PM</p>
            </div>

            <div className="mt-8 border border-gray-800 rounded-xl p-6 bg-gray-950/40">
              <h3 className="text-lg text-orange-400">Quick Support</h3>
              <p className="mt-2 text-gray-300">
                For booking, hospitality services, or general queries—drop a message using the form.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

