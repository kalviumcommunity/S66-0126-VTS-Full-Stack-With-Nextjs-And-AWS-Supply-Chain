"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Package } from "lucide-react";
import Image from "next/image";

interface Artist {
    id: string;
    name: string;
    craft: string;
    origin: string;
    bio: string;
    image: string;
    artworks: number;
    rating: number;
    sold: number;
    specialty: string[];
}

const fallbackArtists: Artist[] = [
    { id: "1", name: "Savita Bhoir", craft: "Warli Painting", origin: "Palghar, Maharashtra, India", bio: "Savita belongs to the Warli tribe and has been painting since age 9. Her work depicts the rhythm of daily village life — harvests, dances, and nature — using age-old geometric forms.", image: "/artist-savita.jpg", artworks: 24, rating: 4.9, sold: 183, specialty: ["Warli", "Folk Art", "Ritual Paintings"] },
    { id: "2", name: "Kofi Mensah", craft: "Kente Weaving", origin: "Bonwire, Ashanti Region, Ghana", bio: "Kofi is a 4th-generation master weaver from the birthplace of Kente cloth. Each strip he weaves carries a proverb, a history, and a message — a language only the cloth can speak.", image: "/artist-kofi.jpg", artworks: 17, rating: 5.0, sold: 94, specialty: ["Kente", "Silk Weaving", "Royal Patterns"] },
    { id: "3", name: "Yara Quispe", craft: "Andean Beadwork & Embroidery", origin: "Pisac, Cusco, Peru", bio: "Yara's vibrant beadwork and embroidered textiles fuse Andean Quechua symbolism with contemporary color. She trains other women in her community, preserving art that spans 2,000 years.", image: "/artist-yara.jpg", artworks: 31, rating: 4.8, sold: 215, specialty: ["Beadwork", "Quechua Textiles", "Natural Dyes"] },
    { id: "4", name: "Amara Diallo", craft: "Wood Carving & Mask Making", origin: "Bamako, Mali", bio: "Amara's carved masks and totems draw from Bambara ceremonial traditions. Each piece takes weeks of work, infused with spiritual meaning passed down from his grandfather, a village shaman.", image: "/artist-amara.jpg", artworks: 19, rating: 4.9, sold: 67, specialty: ["Iroko Wood", "Ceremonial Masks", "Totems"] },
    { id: "5", name: "Urmila Devi", craft: "Madhubani Painting", origin: "Madhubani, Bihar, India", bio: "Urmila is a Padma Shri award-winning Madhubani artist. Her paintings narrate scenes from Hindu epics using intricate line work and bold vegetable dyes on handmade paper and cloth.", image: "/artist-urmila.jpg", artworks: 42, rating: 5.0, sold: 389, specialty: ["Madhubani", "Mithila Art", "Epic Narratives"] },
    { id: "6", name: "Zanele Mokoena", craft: "Ndebele Beadwork", origin: "Mpumalanga, South Africa", bio: "Zanele creates traditional Ndebele beaded aprons, collars, and wall panels whose geometric patterns encode social status and life milestones. Her work has been exhibited across Europe.", image: "/artist-zanele.jpg", artworks: 28, rating: 4.8, sold: 142, specialty: ["Ndebele", "Seed Beadwork", "Wearable Art"] },
    { id: "7", name: "Dawit Haile", craft: "Ethiopian Woodwork & Painting", origin: "Lalibela, Ethiopia", bio: "Inspired by the rock-hewn churches of Lalibela, Dawit carves sacred iconography into olive wood and creates tempera paintings on goat hide — a tradition over 800 years old.", image: "/artist-dawit.jpg", artworks: 15, rating: 4.7, sold: 53, specialty: ["Olive Wood", "Coptic Icons", "Hide Painting"] },
    { id: "8", name: "Padma Reddy", craft: "Kalamkari & Block Printing", origin: "Srikalahasti, Andhra Pradesh, India", bio: "Padma uses a sharpened bamboo pen dipped in fermented iron solution to draw intricate Kalamkari scenes by hand on cotton. No two of her pieces are ever the same.", image: "/artist-padma.jpg", artworks: 36, rating: 4.9, sold: 204, specialty: ["Kalamkari", "Natural Dyes", "Block Print"] },
    { id: "9", name: "Fatoumata Coulibaly", craft: "Bogolan Mud Cloth", origin: "Ségou, Mali", bio: "Fatoumata creates authentic Bogolan cloth using fermented mud and plant-based dyes. The abstract symbols she weaves into each cloth are a form of secret feminine language unique to her village.", image: "/artist-fatoumata.jpg", artworks: 22, rating: 4.8, sold: 91, specialty: ["Mud Cloth", "Natural Pigments", "Textile Art"] },
];

export default function ArtistsSection() {
    const [artists, setArtists] = useState<Artist[]>(fallbackArtists);

    useEffect(() => {
        fetch("/api/artists")
            .then(r => r.json())
            .then(data => {
                if (data.artists && data.artists.length > 0) {
                    setArtists(data.artists);
                }
            })
            .catch(() => {/* use fallback */ });
    }, []);

    return (
        <section id="artists" className="py-24 bg-secondary/30 tribal-pattern">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-3">
                        The Artisans
                    </span>
                    <h2 className="section-title text-4xl font-bold text-foreground">
                        Meet the <span className="italic text-primary">Makers</span>
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                        Behind every piece is a person with a name, a village, and a story. Here are some of the artisans you support when you buy on ArtRoot.
                    </p>
                </div>

                {/* Artist cards */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {artists.map(artist => (
                        <div key={artist.id} className="rounded-2xl border border-border bg-card overflow-hidden card-art group">
                            {/* Photo */}
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={artist.image}
                                    alt={artist.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="font-serif text-xl font-bold text-white">{artist.name}</h3>
                                    <p className="text-xs text-white/80 font-medium">{artist.craft}</p>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                                    <MapPin size={12} />
                                    {artist.origin}
                                </div>

                                <p className="text-sm text-muted-foreground leading-relaxed">{artist.bio}</p>

                                {/* Specialties */}
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {artist.specialty.map(s => (
                                        <span key={s} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Stats */}
                                <div className="mt-5 grid grid-cols-3 gap-3 rounded-xl bg-secondary/50 p-3">
                                    {[
                                        { icon: Package, value: artist.artworks, label: "Works" },
                                        { icon: Star, value: artist.rating, label: "Rating" },
                                        { icon: Package, value: artist.sold, label: "Sold" },
                                    ].map(({ value, label }) => (
                                        <div key={label} className="text-center">
                                            <div className="font-serif text-lg font-bold text-foreground">{value}</div>
                                            <div className="text-xs text-muted-foreground">{label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
