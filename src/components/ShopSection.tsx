"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Star, MapPin, Check, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

interface Product {
    id: string;
    title: string;
    artist: string;
    origin: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    tag: string;
    material: string;
    badge: string;
}

// Fallback products for when DB is not available
const fallbackProducts: Product[] = [
    { id: "1", title: "Warli Village Life", artist: "Savita Bhoir", origin: "Maharashtra, India", price: 85, rating: 4.9, reviews: 38, image: "/art-warli.jpg", tag: "Painting", material: "Natural pigments on handmade paper", badge: "Bestseller" },
    { id: "2", title: "Kente Heritage Cloth", artist: "Kofi Mensah", origin: "Ashanti Region, Ghana", price: 140, rating: 5.0, reviews: 22, image: "/art-kente.jpg", tag: "Textile", material: "Hand-woven cotton & silk", badge: "Fair Trade" },
    { id: "3", title: "Madhubani Peacock Garden", artist: "Urmila Devi", origin: "Bihar, India", price: 110, rating: 4.8, reviews: 51, image: "/art-madhubani.jpg", tag: "Painting", material: "Vegetable dyes on handmade paper", badge: "Certified" },
    { id: "4", title: "Ancestral Tribal Mask", artist: "Amara Diallo", origin: "Bamako, Mali", price: 220, rating: 4.9, reviews: 15, image: "/art-mask.jpg", tag: "Sculpture", material: "Hand-carved Iroko wood", badge: "Rare" },
    { id: "5", title: "Sacred Sun Weaving", artist: "Yara Quispe", origin: "Pisac, Cusco, Peru", price: 175, rating: 4.9, reviews: 29, image: "/art-sun-weaving.jpg", tag: "Textile", material: "Alpaca wool with natural Andean dyes", badge: "Handloomed" },
    { id: "6", title: "Forest Spirit Totem", artist: "Dawit Haile", origin: "Addis Ababa, Ethiopia", price: 310, rating: 5.0, reviews: 8, image: "/art-forest-totem.jpg", tag: "Sculpture", material: "Hand-carved olive wood & beads", badge: "Rare" },
    { id: "7", title: "Kalamkari Story Scroll", artist: "Padma Reddy", origin: "Andhra Pradesh, India", price: 95, rating: 4.7, reviews: 44, image: "/art-kalamkari.jpg", tag: "Painting", material: "Hand-block printed on cotton fabric", badge: "Certified" },
    { id: "8", title: "Ndebele Bead Collar", artist: "Zanele Mokoena", origin: "Mpumalanga, South Africa", price: 135, rating: 4.8, reviews: 33, image: "/art-ndebele-beads.jpg", tag: "Jewellery", material: "Seed beads on leather backing", badge: "Fair Trade" },
    { id: "9", title: "Gond Tree of Life", artist: "Ram Singh Urveti", origin: "Madhya Pradesh, India", price: 130, rating: 4.9, reviews: 57, image: "/art-gond-tree.jpg", tag: "Painting", material: "Acrylic on canvas, traditional Gond motifs", badge: "Bestseller" },
    { id: "10", title: "Bogolan Mud Cloth", artist: "Fatoumata Coulibaly", origin: "Ségou, Mali", price: 160, rating: 4.8, reviews: 19, image: "/art-bogolan.jpg", tag: "Textile", material: "Fermented mud-dyed cotton strip cloth", badge: "Certified" },
    { id: "11", title: "Pattachitra Ramayana", artist: "Aparna Moharana", origin: "Puri, Odisha, India", price: 200, rating: 5.0, reviews: 13, image: "/art-pattachitra.jpg", tag: "Painting", material: "Stone colours on treated palm leaf", badge: "Rare" },
    { id: "12", title: "Tuareg Silver Pendant", artist: "Aghali Ag Boua", origin: "Agadez, Niger", price: 88, rating: 4.7, reviews: 41, image: "/art-tuareg-pendant.jpg", tag: "Jewellery", material: "Sterling silver with geometric etchings", badge: "Handcrafted" },
];

const filters = ["All", "Painting", "Textile", "Sculpture", "Jewellery"];
const PAGE_SIZE = 4;

interface ShopSectionProps {
    onLoginClick: () => void;
}

export default function ShopSection({ onLoginClick }: ShopSectionProps) {
    const [activeFilter, setActiveFilter] = useState("All");
    const [addedItems, setAddedItems] = useState<string[]>([]);
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [products, setProducts] = useState<Product[]>(fallbackProducts);
    const { isAuthenticated, addToCart } = useAuth();

    useEffect(() => {
        fetch("/api/products?limit=50")
            .then(r => r.json())
            .then(data => {
                if (data.products && data.products.length > 0) {
                    setProducts(data.products);
                }
            })
            .catch(() => {/* use fallback */ });
    }, []);

    const filtered = activeFilter === "All" ? products : products.filter(p => p.tag === activeFilter);
    const visible = filtered.slice(0, visibleCount);
    const hasMore = visibleCount < filtered.length;

    const handleFilterChange = (f: string) => {
        setActiveFilter(f);
        setVisibleCount(PAGE_SIZE);
    };

    const handleAdd = async (product: Product) => {
        if (!isAuthenticated) {
            onLoginClick();
            return;
        }

        const success = await addToCart(product.id);
        if (success) {
            setAddedItems(prev => [...prev, product.id]);
            setTimeout(() => setAddedItems(prev => prev.filter(i => i !== product.id)), 2000);
        }
    };

    return (
        <section id="shop" className="py-24 bg-background">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                        Marketplace
                    </span>
                    <h2 className="section-title text-4xl font-bold text-foreground">
                        Handcrafted with <span className="italic text-primary">Soul</span>
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                        Every piece is one-of-a-kind, authenticated, and purchased directly from the artisan who made it.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 justify-center mb-10">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${activeFilter === f
                                    ? "bg-primary text-primary-foreground shadow-md"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                {/* Products grid */}
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
                    {visible.map(product => {
                        const added = addedItems.includes(product.id);
                        return (
                            <div key={product.id} className="group rounded-2xl border border-border bg-card overflow-hidden card-art">
                                {/* Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                    {/* Badge */}
                                    <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-0.5 text-xs font-semibold text-primary-foreground">
                                        {product.badge}
                                    </span>
                                    {/* Tag */}
                                    <span className="absolute top-3 right-3 rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-foreground">
                                        {product.tag}
                                    </span>
                                </div>

                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-serif text-base font-bold text-foreground leading-snug">{product.title}</h3>
                                    <p className="mt-0.5 text-sm text-muted-foreground">{product.artist}</p>

                                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                                        <MapPin size={11} />
                                        {product.origin}
                                    </div>

                                    <div className="mt-2 flex items-center gap-1 text-xs text-accent">
                                        <Star size={11} fill="currentColor" />
                                        <span className="font-semibold text-foreground">{product.rating}</span>
                                        <span className="text-muted-foreground">({product.reviews})</span>
                                    </div>

                                    <p className="mt-2 text-xs text-muted-foreground italic">{product.material}</p>

                                    <div className="mt-4 flex items-center justify-between">
                                        <span className="font-serif text-xl font-bold text-primary">${product.price}</span>
                                        <button
                                            onClick={() => handleAdd(product)}
                                            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all active:scale-95 ${added
                                                    ? "bg-green-600 text-white"
                                                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                                                }`}
                                        >
                                            {added ? <Check size={13} /> : isAuthenticated ? <ShoppingCart size={13} /> : <LogIn size={13} />}
                                            {added ? "Added!" : isAuthenticated ? "Add to Cart" : "Sign in to Buy"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <p className="text-muted-foreground text-sm">
                        Showing {visible.length} of {filtered.length} artworks
                    </p>
                    {hasMore && (
                        <button
                            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                            className="mt-4 rounded-full border border-border bg-card px-8 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-all"
                        >
                            Load More Artworks
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
