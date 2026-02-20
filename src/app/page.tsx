"use client";

import { useState, useEffect, useRef } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import AppSidebar from "@/components/AppSidebar";
import TopBar from "@/components/TopBar";
import AuthModal from "@/components/AuthModal";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ShopSection from "@/components/ShopSection";
import ArtistsSection from "@/components/ArtistsSection";
import ContactSection from "@/components/ContactSection";

const sections = ["hero", "about", "shop", "artists", "contact"];

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Dark mode with View Transition API
  const toggleDark = () => {
    // If the browser doesn't support View Transitions, just toggle it
    if (!document.startViewTransition) {
      setIsDark((prev) => !prev);
      return;
    }
    document.startViewTransition(() => {
      setIsDark((prev) => !prev);
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) { observer.observe(el); sectionRefs.current[id] = el; }
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Fixed sidebar */}
      <AppSidebar
        activeSection={activeSection}
        onNavigate={scrollTo}
        isDark={isDark}
        onToggleDark={toggleDark}
        onLoginClick={() => setAuthOpen(true)}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-col w-full lg:pl-64">
        <TopBar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onLoginClick={() => setAuthOpen(true)}
          activeSection={activeSection}
        />

        <main className="pt-14">
          <HeroSection
            onShopClick={() => scrollTo("shop")}
            onAboutClick={() => scrollTo("about")}
          />
          <AboutSection onContactClick={() => scrollTo("contact")} />
          <ShopSection onLoginClick={() => setAuthOpen(true)} />
          <ArtistsSection />
          <ContactSection />

          {/* Footer */}
          <footer className="border-t border-border bg-card py-10 px-6 text-center">
            <div className="mx-auto max-w-4xl">
              <div className="font-serif text-2xl font-bold text-foreground mb-2">🪬 ArtRoot</div>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Empowering tribal and rural artisans by connecting them directly with the world. Fair trade, always.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                {["About", "Shop", "Artists", "Contact", "Privacy Policy", "Terms of Service"].map(link => (
                  <button key={link} className="hover:text-foreground transition-colors">{link}</button>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground/60">
                © 2026 ArtRoot. Crafted with ❤️ for artisans everywhere.
              </p>
            </div>
          </footer>
        </main>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

export default function HomePage() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
