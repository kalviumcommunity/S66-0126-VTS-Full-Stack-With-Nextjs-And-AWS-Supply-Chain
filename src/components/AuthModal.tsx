"use client";

import { useState } from "react";
import { X, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<"login" | "signup">("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login, register } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (mode === "signup") {
                const result = await register(name, email, password);
                if (result.success) {
                    onClose();
                    setEmail(""); setPassword(""); setName("");
                } else {
                    setError(result.error || "Registration failed");
                }
            } else {
                const result = await login(email, password);
                if (result.success) {
                    onClose();
                    setEmail(""); setPassword(""); setName("");
                } else {
                    setError(result.error || "Invalid credentials");
                }
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <div
                className="relative w-full max-w-md rounded-2xl bg-card shadow-2xl overflow-hidden animate-fade-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary" />

                <div className="p-8">
                    {/* Close */}
                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 rounded-full p-1.5 text-muted-foreground hover:bg-muted transition-colors"
                    >
                        <X size={18} />
                    </button>

                    {/* Header */}
                    <div className="mb-7 text-center">
                        <span className="text-2xl">🪬</span>
                        <h2 className="mt-2 font-serif text-2xl font-bold text-foreground">
                            {mode === "login" ? "Welcome Back" : "Join ArtRoot"}
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {mode === "login"
                                ? "Sign in to explore authentic tribal art"
                                : "Create your account to start collecting"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {mode === "signup" && (
                            <div className="relative">
                                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type="email"
                                placeholder="Email address"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                            />
                        </div>

                        <div className="relative">
                            <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full rounded-lg border border-border bg-background pl-10 pr-10 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>

                        {error && <p className="text-sm text-destructive">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                        >
                            {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-sm text-muted-foreground">
                        {mode === "login" ? "New to ArtRoot? " : "Already have an account? "}
                        <button
                            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
                            className="font-semibold text-primary hover:underline"
                        >
                            {mode === "login" ? "Create account" : "Sign in"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
