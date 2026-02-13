export default function Artists() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6 text-center">
            <div className="h-24 w-24 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="font-semibold">Artist Name</h3>
            <p className="text-sm text-gray-600 mb-4">
              Short description about the artist and their craft.
            </p>
            <button className="bg-black text-white px-4 py-1 rounded text-sm">
              View Profile
            </button>
          </div>
        ))}

      </div>
    </div>
  );
}
