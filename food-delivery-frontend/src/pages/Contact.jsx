import Navbar from "../components/Navbar";

function Contact() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="p-10">

        <h1 className="text-5xl text-orange-500">
          Contact Us
        </h1>

        <div className="mt-8 space-y-3">

          <p>📞 8247542849</p>
          <p>📞 7995808091</p>
          <p>📧 support@luxora.com</p>

        </div>

      </div>
    </div>
  );
}

export default Contact;