"use client";

import { Home, BookOpen, ShoppingBag, Users, Phone, Sun, Moon, LogOut, User, ShoppingCart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface AppSidebarProps {
    activeSection: string;
    onNavigate: (section: string) => void;
    isDark: boolean;
    onToggleDark: () => void;
    onLoginClick: () => void;
    isOpen: boolean;
    onClose: () => void;
}

const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "about", label: "About", icon: BookOpen },
    { id: "shop", label: "Shop", icon: ShoppingBag },
    { id: "artists", label: "Artists", icon: Users },
    { id: "contact", label: "Contact Us", icon: Phone },
];

export default function AppSidebar({
    activeSection, onNavigate, isDark, onToggleDark, onLoginClick, isOpen, onClose,
}: AppSidebarProps) {
    const { user, logout, isAuthenticated, cartCount } = useAuth();

    const handleNav = (id: string) => {
        onNavigate(id);
        onClose();
    };

    return (
        <>
            {/* Backdrop on mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 z-40 flex h-screen w-64 flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
                style={{ background: "hsl(var(--sidebar-background))" }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-6 py-7" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
                    <div className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold" style={{ background: "hsl(var(--sidebar-primary))", color: "hsl(var(--sidebar-primary-foreground))" }}>
                        🪬
                    </div>
                    <div>
                        <h1 className="font-serif text-lg font-bold leading-tight" style={{ color: "hsl(var(--sidebar-foreground))" }}>ArtRoot</h1>
                        <p className="text-xs" style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}>Fair Trade Art Platform</p>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
                    <p className="px-3 mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--sidebar-foreground) / 0.4)" }}>
                        Navigate
                    </p>
                    {navItems.map(({ id, label, icon: Icon }) => {
                        const isActive = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => handleNav(id)}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                                style={{
                                    background: isActive ? "hsl(var(--sidebar-primary))" : "transparent",
                                    color: isActive ? "hsl(var(--sidebar-primary-foreground))" : "hsl(var(--sidebar-foreground) / 0.7)",
                                }}
                            >
                                <Icon size={18} />
                                {label}
                                {isActive && <div className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: "hsl(var(--sidebar-primary-foreground))" }} />}
                            </button>
                        );
                    })}

                    {/* Cart link */}
                    <Link
                        href="/cart"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                        style={{ color: "hsl(var(--sidebar-foreground) / 0.7)" }}
                    >
                        <ShoppingCart size={18} />
                        Cart
                        {cartCount > 0 && (
                            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold" style={{ background: "hsl(var(--sidebar-primary))", color: "hsl(var(--sidebar-primary-foreground))" }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </nav>

                {/* Bottom controls */}
                <div className="px-3 py-4 space-y-2" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
                    {/* Dark mode toggle */}
                    <button
                        onClick={onToggleDark}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all"
                        style={{ color: "hsl(var(--sidebar-foreground) / 0.7)" }}
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                        {isDark ? "Light Mode" : "Dark Mode"}
                    </button>

                    {/* Auth */}
                    {isAuthenticated ? (
                        <div className="space-y-1">
                            <div className="flex items-center gap-3 px-3 py-2">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                                    {user?.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold truncate" style={{ color: "hsl(var(--sidebar-foreground))" }}>{user?.name}</p>
                                    <p className="text-xs truncate" style={{ color: "hsl(var(--sidebar-foreground) / 0.5)" }}>{user?.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={onLoginClick}
                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all"
                            style={{ background: "hsl(var(--sidebar-primary))", color: "hsl(var(--sidebar-primary-foreground))" }}
                        >
                            <User size={18} />
                            Sign In / Register
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
}
