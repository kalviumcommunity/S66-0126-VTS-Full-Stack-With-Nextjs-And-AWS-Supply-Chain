export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-2xl font-semibold mb-6">About Us</h1>

        <p className="text-sm text-gray-700 leading-relaxed mb-10">
          TribalArtMarketplace is dedicated to supporting and showcasing the incredible talents of tribal artists from around the world.
          Our mission is to provide a platform that celebrates the rich cultural heritage and unique creativity of these artists.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="h-40 bg-gray-300 rounded-xl"></div>
          <div className="h-40 bg-gray-300 rounded-xl"></div>
          <div className="h-40 bg-gray-300 rounded-xl"></div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Our Mission</h2>

        <p className="text-sm text-gray-700 leading-relaxed">
          We believe in the power of art to transcend boundaries and connect people. By supporting tribal artists, we aim to preserve cultural legacies and promote sustainable livelihoods.
        </p>

      </div>
    </div>
  );
}
