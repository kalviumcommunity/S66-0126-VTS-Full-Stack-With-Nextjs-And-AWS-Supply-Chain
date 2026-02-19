import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT SIDE - LOGO */}
        <h1 className="text-black font-bold text-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
          TribalArtMarketplace
        </h1>

        {/* RIGHT SIDE - NAV LINKS */}
        <nav className="flex items-center gap-6 text-base font-bold text-black">
          <Link href="/" className="hover:text-orange-600 hover:scale-110 transition-all duration-300">Home</Link>
          <Link href="/shop" className="hover:text-orange-600 hover:scale-110 transition-all duration-300">Shop</Link>
          <Link href="/about" className="hover:text-orange-600 hover:scale-110 transition-all duration-300">About Us</Link>
          <Link href="/artists" className="hover:text-orange-600 hover:scale-110 transition-all duration-300">Artist Profiles</Link>
          <Link href="/contact" className="hover:text-orange-600 hover:scale-110 transition-all duration-300">Contact</Link>
          <Link
            href="/login"
            className="ml-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </nav>

      </div>
    </header>
  );
}
