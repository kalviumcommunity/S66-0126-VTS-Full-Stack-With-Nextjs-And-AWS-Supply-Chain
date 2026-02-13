export default function Shop() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-4 gap-10">

        {/* FILTER SIDEBAR */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="font-semibold mb-6">Filters</h2>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Category</h3>
            <div className="space-y-2 text-sm">
              <label><input type="checkbox" className="mr-2" />Masks</label><br/>
              <label><input type="checkbox" className="mr-2" />Sculptures</label><br/>
              <label><input type="checkbox" className="mr-2" />Paintings</label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3">Price Range</h3>
            <input type="range" className="w-full" />
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Popularity</h3>
            <div className="space-y-2 text-sm">
              <label><input type="radio" name="pop" className="mr-2" />High to Low</label><br/>
              <label><input type="radio" name="pop" className="mr-2" />Low to High</label>
            </div>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="col-span-3 grid md:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-4">
              <div className="h-40 bg-gray-300 rounded-lg mb-4"></div>
              <h3 className="font-semibold">Product Title</h3>
              <p className="text-sm">$150.00</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
