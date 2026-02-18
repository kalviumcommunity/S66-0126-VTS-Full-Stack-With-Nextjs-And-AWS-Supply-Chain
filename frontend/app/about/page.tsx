export const revalidate = false;

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen px-12 py-16">

      {/* ABOUT HEADING */}
      <h1 className="text-3xl font-bold mb-6 text-black">
        About Us
      </h1>

      {/* ABOUT TEXT */}
      <p className="text-base font-italic text-gray-800 leading-relaxed max-w-4xl mb-12">
        TribalArtMarketplace is dedicated to supporting and showcasing the incredible
        talents of tribal artists from around the world. Our mission is to provide
        a platform that celebrates the rich cultural heritage and unique creativity
        of these artists, ensuring their work reaches a global audience.
      </p>

      {/* RECTANGLE IMAGES ROW */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <img
          src="/images/artist.png"
          alt="Tribal artist working"
          className="rounded-xl object-cover h-56 w-full"
        />
        <img
          src="/images/about2.png"
          alt="Tribal jewelry"
          className="rounded-xl object-cover h-56 w-full"
        />
        <img
          src="/images/about3.png"
          alt="Tribal dance"
          className="rounded-xl object-cover h-56 w-full"
        />
      </div>

      {/* MISSION SECTION */}
      <h2 className="text-2xl font-bold mb-4 text-black">
        Our Mission
      </h2>

      <p className="text-base font-italic text-gray-800 leading-relaxed max-w-4xl mb-12">
        We believe in the power of art to transcend boundaries and connect people.
        By supporting tribal artists, we aim to preserve cultural legacies and
        promote sustainable livelihoods. Our marketplace offers a diverse array
        of art pieces, from paintings and sculptures to textiles and jewelry,
        each telling a unique story.
      </p>

      {/* CIRCULAR IMAGES */}
      <div className="flex gap-12 mt-8">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
          <img
            src="/images/circle1.png"
            alt="Tribal person"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="w-40 h-40 rounded-full overflow-hidden shadow-lg">
          <img
            src="/images/circle2.png"
            alt="Tribal pattern"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}
