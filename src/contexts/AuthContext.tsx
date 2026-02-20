"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
}

interface CartItemType {
    id: string;
    productId: string;
    quantity: number;
    product: {
        id: string;
        title: string;
        artist: string;
        price: number;
        image: string;
        tag: string;
    };
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    cartItems: CartItemType[];
    cartCount: number;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    addToCart: (productId: string) => Promise<boolean>;
    removeFromCart: (cartItemId: string) => Promise<boolean>;
    updateCartQuantity: (cartItemId: string, quantity: number) => Promise<boolean>;
    fetchCart: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [cartItems, setCartItems] = useState<CartItemType[]>([]);

    // Check for existing session on mount
    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");
        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }
        setIsLoading(false);
    }, []);

    // Fetch cart when user changes
    const fetchCart = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCartItems([]);
            return;
        }
        try {
            const res = await fetch("/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setCartItems(data.items || []);
            }
        } catch {
            // Fail silently
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [user, fetchCart]);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, error: data.error || "Login failed" };
        } catch {
            return { success: false, error: "Network error" };
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            const data = await res.json();
            if (res.ok && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                setUser(data.user);
                return { success: true };
            }
            return { success: false, error: data.error || "Registration failed" };
        } catch {
            return { success: false, error: "Network error" };
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setCartItems([]);
    };

    const addToCart = async (productId: string): Promise<boolean> => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await fetch("/api/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });
            if (res.ok) {
                await fetchCart();
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const removeFromCart = async (cartItemId: string): Promise<boolean> => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await fetch(`/api/cart?id=${cartItemId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                await fetchCart();
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const updateCartQuantity = async (cartItemId: string, quantity: number): Promise<boolean> => {
        const token = localStorage.getItem("token");
        if (!token) return false;
        try {
            const res = await fetch("/api/cart", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ cartItemId, quantity }),
            });
            if (res.ok) {
                await fetchCart();
                return true;
            }
            return false;
        } catch {
            return false;
        }
    };

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                cartItems,
                cartCount,
                login,
                register,
                logout,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                fetchCart,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
