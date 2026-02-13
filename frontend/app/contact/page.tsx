export default function Contact() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="font-semibold mb-6">Contact Us</h2>

          <input className="w-full border p-3 rounded mb-4" placeholder="Name" />
          <input className="w-full border p-3 rounded mb-4" placeholder="Email" />
          <textarea className="w-full border p-3 rounded mb-4" placeholder="Message" />

          <button className="bg-black text-white w-full py-2 rounded">
            Send Message
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Contact Information</h3>
            <p>Address: 123 Tribal Art St</p>
            <p>Phone: (123) 456-7890</p>
            <p>Email: contact@tribalart.com</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <p>Facebook • Twitter • Instagram</p>
          </div>
        </div>

      </div>
    </div>
  );
}
