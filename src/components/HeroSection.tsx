"use client";

import { ArrowDown, ShieldCheck, Globe, Sparkles } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
    onShopClick: () => void;
    onAboutClick: () => void;
}

export default function HeroSection({ onShopClick, onAboutClick }: HeroSectionProps) {
    return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <Image
                    src="/hero-bg.jpg"
                    alt="Tribal artisan creating folk art"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
            </div>

            {/* Subtle tribal pattern overlay */}
            <div className="absolute inset-0 tribal-pattern opacity-20" />

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-ochre-400/40 bg-ochre-500/10 px-4 py-1.5 text-sm font-medium text-ochre-300 backdrop-blur-sm mb-8 animate-fade-in">
                    <Sparkles size={14} />
                    Authentic · Fair Trade · Direct from Artists
                </div>

                <h1 className="font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl animate-fade-up">
                    Where Ancient Art
                    <br />
                    <span className="italic text-accent">Finds New Homes</span>
                </h1>

                <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 animate-fade-up" style={{ animationDelay: "0.15s" }}>
                    ArtRoot connects tribal and rural artisans directly with global collectors — no middlemen, fair prices, and every piece tells a story of heritage passed down through generations.
                </p>

                {/* Stats */}
                <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/90 animate-fade-up" style={{ animationDelay: "0.25s" }}>
                    {[
                        { value: "1,200+", label: "Artists Worldwide" },
                        { value: "8,500+", label: "Artworks Sold" },
                        { value: "94%", label: "Artist Earnings" },
                    ].map(stat => (
                        <div key={stat.label} className="text-center">
                            <div className="font-serif text-3xl font-bold text-accent">{stat.value}</div>
                            <div className="mt-0.5 text-xs uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* CTAs */}
                <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.35s" }}>
                    <button
                        onClick={onShopClick}
                        className="rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/85 active:scale-[0.97] transition-all shadow-lg"
                    >
                        Explore the Shop
                    </button>
                    <button
                        onClick={onAboutClick}
                        className="rounded-full border border-white/40 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20 active:scale-[0.97] transition-all"
                    >
                        Our Story
                    </button>
                </div>

                {/* Trust badges */}
                <div className="mt-14 flex flex-wrap justify-center gap-6 text-white/60 animate-fade-up" style={{ animationDelay: "0.45s" }}>
                    {[
                        { icon: ShieldCheck, text: "Authenticity Guaranteed" },
                        { icon: Globe, text: "Ships Worldwide" },
                        { icon: Sparkles, text: "Zero Middlemen" },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="flex items-center gap-1.5 text-xs">
                            <Icon size={14} className="text-accent" />
                            {text}
                        </div>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <ArrowDown size={20} />
            </div>
        </section>
    );
}
