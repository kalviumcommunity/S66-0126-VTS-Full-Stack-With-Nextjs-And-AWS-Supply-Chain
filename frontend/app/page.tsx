export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO IMAGE */}
      <div className="w-full">
        <img
          src="/images/hero.png"
          alt="Tribal art hero banner"
          className="w-full h-[400px] object-cover"
        />
      </div>

      {/* FEATURED ARTWORKS */}
      <section className="max-w-7xl mx-auto px-12 py-16">
        <h2 className="text-2xl font-bold text-black mb-10">
          Featured Artworks
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <div className="h-64 bg-white-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="/images/mask.png"
                alt="Tribal mask artwork"
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="font-bold text-lg mb-2">Tribal Mask</h3>
            <p className="text-sm text-gray-600">
              This mask represents the vibrant cultural expressions of tribal communities.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <div className="h-64 bg-white-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="/images/sculpture.png"
                alt="Wooden sculpture artwork"
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="font-bold text-lg mb-2">Wooden Sculpture</h3>
            <p className="text-sm text-gray-600">
              A wooden sculpture capturing the essence of tribal artistry.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
            <div className="h-64 bg-white-100 rounded-lg mb-6 flex items-center justify-center">
              <img
                src="/images/painting.png"
                alt="Tribal painting artwork"
                className="max-h-full object-contain"
              />
            </div>

            <h3 className="font-bold text-lg mb-2">Tribal Painting</h3>
            <p className="text-sm text-gray-600">
              A painting showcasing rich artistic traditions and motifs.
            </p>
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-12 pb-16">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>

        <div className="flex gap-4">
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Masks
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Sculptures
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-gray-800 transition">
            Paintings
          </button>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="max-w-7xl mx-auto px-12 pb-20">
        <h2 className="text-2xl font-bold mb-4">About the Marketplace</h2>

        <p className="text-sm text-gray-700 leading-relaxed max-w-3xl">
          The Tribal Art Marketplace is a curated collection of traditional and contemporary
          tribal artworks. Our mission is to preserve and promote the cultural heritage
          of tribal communities through art. Explore our diverse selection of masks,
          sculptures, and paintings, each piece telling a unique story.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-300 py-6 text-center text-sm">
        © 2023 Tribal Art Marketplace
      </footer>

    </div>
  );
}
