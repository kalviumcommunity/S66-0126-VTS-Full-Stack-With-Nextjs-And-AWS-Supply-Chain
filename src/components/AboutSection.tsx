"use client";

import { Heart, Leaf, Award, ArrowRight } from "lucide-react";

interface AboutSectionProps {
    onContactClick: () => void;
}

export default function AboutSection({ onContactClick }: AboutSectionProps) {
    const values = [
        {
            icon: Heart,
            title: "Fair Compensation",
            desc: "Artists receive 94% of every sale. We charge a minimal platform fee to keep the lights on — that's it.",
        },
        {
            icon: Award,
            title: "Authenticity Certified",
            desc: "Every piece carries a digital certificate of authenticity with the artist's story, origin, and technique used.",
        },
        {
            icon: Leaf,
            title: "Sustainable Craft",
            desc: "Traditional art forms use natural materials and generations-old techniques — sustainably made, beautifully preserved.",
        },
    ];

    return (
        <section id="about" className="py-24 bg-secondary/30 tribal-pattern">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
                            Our Mission
                        </span>
                        <h2 className="section-title text-4xl font-bold text-foreground leading-tight">
                            Bridging Heritage &
                            <span className="italic text-primary"> Global Markets</span>
                        </h2>
                        <p className="mt-5 text-base text-muted-foreground leading-relaxed">
                            ArtRoot was born from a simple truth: the world&apos;s most extraordinary art is made in the world&apos;s most remote villages — and the people who make it rarely benefit from its true value.
                        </p>
                        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                            We&apos;ve built a platform where tribal and rural artists list their work directly, set their own prices, and connect with buyers who appreciate the story behind each piece. No galleries, no exporters, no exploitation.
                        </p>
                        <button
                            onClick={onContactClick}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                        >
                            Get in touch
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    {/* Values grid */}
                    <div className="space-y-4">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div
                                key={title}
                                className="flex gap-4 rounded-2xl border border-border bg-card p-5 card-art"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <h3 className="font-serif text-base font-bold text-foreground">{title}</h3>
                                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* How it works */}
                <div className="mt-20">
                    <h3 className="text-center font-serif text-2xl font-bold text-foreground mb-10">How ArtRoot Works</h3>
                    <div className="grid gap-6 sm:grid-cols-3">
                        {[
                            { step: "01", title: "Artist Registers", desc: "Rural and tribal artists create a profile, share their story, and upload their handcrafted works." },
                            { step: "02", title: "You Discover & Buy", desc: "Browse a curated collection of authentic pieces. Each listing includes the artist's village, technique, and materials." },
                            { step: "03", title: "Direct Earnings", desc: "Payment goes directly to the artist within 48 hours of purchase. No middlemen, no delays." },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="relative rounded-2xl border border-border bg-card p-6 card-art text-center">
                                <div className="font-serif text-5xl font-bold text-primary/15 absolute top-4 right-5 leading-none select-none">
                                    {step}
                                </div>
                                <h4 className="font-serif text-lg font-bold text-foreground">{title}</h4>
                                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
