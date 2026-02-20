"use client";

import { Menu, X, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface TopBarProps {
    onMenuToggle: () => void;
    sidebarOpen: boolean;
    onLoginClick: () => void;
    activeSection: string;
}

export default function TopBar({ onMenuToggle, sidebarOpen, onLoginClick, activeSection }: TopBarProps) {
    const { isAuthenticated, cartCount } = useAuth();

    const labels: Record<string, string> = {
        hero: "Home",
        about: "About",
        shop: "Shop",
        artists: "Artists",
        contact: "Contact",
    };

    return (
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-20 flex h-14 items-center justify-between border-b border-border bg-card/90 backdrop-blur-md px-4">
            {/* Mobile menu toggle */}
            <button
                onClick={onMenuToggle}
                className="rounded-lg p-2 text-foreground hover:bg-secondary transition-colors lg:hidden"
            >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Current section label */}
            <p className="text-sm font-semibold text-foreground hidden lg:block">
                {labels[activeSection] || "ArtRoot"}
            </p>

            {/* Mobile logo */}
            <span className="font-serif text-lg font-bold text-foreground lg:hidden">🪬 ArtRoot</span>

            {/* Right actions */}
            <div className="flex items-center gap-2">
                <Link
                    href="/cart"
                    className="relative rounded-lg p-2 text-foreground hover:bg-secondary transition-colors"
                >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                            {cartCount}
                        </span>
                    )}
                </Link>

                {!isAuthenticated && (
                    <button
                        onClick={onLoginClick}
                        className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all"
                    >
                        Sign In
                    </button>
                )}
            </div>
        </header>
    );
}
