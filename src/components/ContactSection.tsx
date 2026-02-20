"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [sending, setSending] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                setSent(true);
                toast.success("Message sent successfully!");
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to send message");
            }
        } catch {
            toast.error("Network error. Please try again.");
        } finally {
            setSending(false);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition";

    return (
        <section id="contact" className="py-24 bg-background">
            <div className="mx-auto max-w-6xl px-6">
                {/* Header */}
                <div className="text-center mb-14">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent mb-3">
                        Get in Touch
                    </span>
                    <h2 className="section-title text-4xl font-bold text-foreground">
                        We&apos;d Love to <span className="italic text-primary">Hear From You</span>
                    </h2>
                    <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
                        Whether you&apos;re an artisan wanting to join, a buyer with questions, or a partner looking to collaborate — reach out anytime.
                    </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-5">
                    {/* Contact info */}
                    <div className="lg:col-span-2 space-y-6">
                        {[
                            { icon: Mail, label: "Email Us", value: "hello@artroot.co", sub: "We reply within 24 hours" },
                            { icon: Phone, label: "Call Us", value: "+1 (800) ART-ROOT", sub: "Mon–Fri, 9am–6pm IST" },
                            { icon: MapPin, label: "Headquarters", value: "Mumbai, India", sub: "Serving artists globally" },
                        ].map(({ icon: Icon, label, value, sub }) => (
                            <div key={label} className="flex gap-4 rounded-2xl border border-border bg-card p-5 card-art">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={20} />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
                                    <p className="mt-0.5 font-semibold text-foreground">{value}</p>
                                    <p className="text-xs text-muted-foreground">{sub}</p>
                                </div>
                            </div>
                        ))}

                        {/* Artisan CTA */}
                        <div className="rounded-2xl bg-primary p-6 text-primary-foreground">
                            <h4 className="font-serif text-lg font-bold">For Artisans</h4>
                            <p className="mt-2 text-sm text-primary-foreground/80 leading-relaxed">
                                Want to list your work on ArtRoot? We&apos;ll guide you through every step. No tech experience needed — just your craft.
                            </p>
                            <p className="mt-3 text-sm font-semibold">artists@artroot.co</p>
                        </div>
                    </div>

                    {/* Contact form */}
                    <div className="lg:col-span-3 rounded-2xl border border-border bg-card p-8 card-art">
                        {sent ? (
                            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                                <CheckCircle size={52} className="text-green-500 mb-4" />
                                <h3 className="font-serif text-2xl font-bold text-foreground">Message Sent!</h3>
                                <p className="mt-2 text-muted-foreground">
                                    Thank you for reaching out. We&apos;ll get back to you shortly.
                                </p>
                                <button
                                    onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Your Name</label>
                                        <input type="text" placeholder="Anita Sharma" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required className={inputClass} />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</label>
                                        <input type="email" placeholder="anita@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Subject</label>
                                    <select value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} required className={inputClass}>
                                        <option value="">Select a topic…</option>
                                        <option>I want to join as an artist</option>
                                        <option>Question about an order</option>
                                        <option>Partnership inquiry</option>
                                        <option>Report authenticity concern</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message</label>
                                    <textarea rows={5} placeholder="Tell us more about what you need…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required className={`${inputClass} resize-none`} />
                                </div>

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60"
                                >
                                    <Send size={16} />
                                    {sending ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
