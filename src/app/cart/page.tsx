"use client";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

function CartContent() {
    const { cartItems, cartCount, updateCartQuantity, removeFromCart, isAuthenticated } = useAuth();
    const [processing, setProcessing] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shipping = subtotal > 200 ? 0 : 15;
    const total = subtotal + shipping;

    const handleCheckout = async () => {
        setProcessing(true);
        // Simulate payment processing
        await new Promise(r => setTimeout(r, 2000));
        toast.success("Order placed successfully! 🎉 Your artworks are on their way.");
        setProcessing(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <ShoppingBag size={64} className="text-muted-foreground mx-auto mb-6" />
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Sign in to view your cart</h1>
                    <p className="text-muted-foreground mb-8">You need to be logged in to manage your cart and place orders.</p>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                        <ArrowLeft size={16} />
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center px-6">
                <div className="text-center max-w-md">
                    <ShoppingBag size={64} className="text-muted-foreground mx-auto mb-6" />
                    <h1 className="font-serif text-3xl font-bold text-foreground mb-3">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8">Discover unique handcrafted artworks from talented artisans around the world.</p>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all">
                        <ArrowLeft size={16} />
                        Explore the Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border bg-card/90 backdrop-blur-md">
                <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <ArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                    <h1 className="font-serif text-xl font-bold text-foreground">🪬 ArtRoot</h1>
                    <span className="text-sm text-muted-foreground">{cartCount} items</span>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-10">
                <h2 className="font-serif text-3xl font-bold text-foreground mb-8">Your Cart</h2>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex gap-4 rounded-2xl border border-border bg-card p-4 card-art">
                                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.title}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-serif font-bold text-foreground truncate">{item.product.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.product.artist}</p>
                                    <p className="text-xs text-muted-foreground mt-1">{item.product.tag}</p>

                                    <div className="mt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                                            <button
                                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-secondary transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="font-serif text-lg font-bold text-primary">${(item.product.price * item.quantity).toFixed(2)}</span>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="rounded-full p-2 text-destructive hover:bg-destructive/10 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary + Payment */}
                    <div className="space-y-6">
                        {/* Summary */}
                        <div className="rounded-2xl border border-border bg-card p-6 card-art">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Order Summary</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Subtotal ({cartCount} items)</span>
                                    <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className={`font-semibold ${shipping === 0 ? "text-green-600" : "text-foreground"}`}>
                                        {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-xs text-muted-foreground italic">Free shipping on orders over $200</p>
                                )}
                                <div className="border-t border-border pt-3 flex justify-between">
                                    <span className="font-semibold text-foreground">Total</span>
                                    <span className="font-serif text-xl font-bold text-primary">${total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Options */}
                        <div className="rounded-2xl border border-border bg-card p-6 card-art">
                            <h3 className="font-serif text-lg font-bold text-foreground mb-4">Payment Method</h3>

                            <div className="space-y-3 mb-6">
                                <label className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors">
                                    <input type="radio" name="payment" defaultChecked className="accent-primary" />
                                    <CreditCard size={20} className="text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Credit / Debit Card</p>
                                        <p className="text-xs text-muted-foreground">Visa, Mastercard, Amex</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <Smartphone size={20} className="text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">UPI / Digital Wallet</p>
                                        <p className="text-xs text-muted-foreground">Google Pay, PhonePe, PayPal</p>
                                    </div>
                                </label>

                                <label className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors">
                                    <input type="radio" name="payment" className="accent-primary" />
                                    <ShoppingBag size={20} className="text-primary" />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground">Cash on Delivery</p>
                                        <p className="text-xs text-muted-foreground">Pay when you receive</p>
                                    </div>
                                </label>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={processing}
                                className="w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                            >
                                {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                            </button>

                            <p className="mt-3 text-xs text-center text-muted-foreground">
                                🔒 Secure checkout · 94% goes directly to the artist
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CartPage() {
    return (
        <AuthProvider>
            <CartContent />
        </AuthProvider>
    );
}
