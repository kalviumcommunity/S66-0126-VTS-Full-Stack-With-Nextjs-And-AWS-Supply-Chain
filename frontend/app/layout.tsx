import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import SWRProvider from "@/context/SWRProvider";
import ToasterProvider from "@/context/ToasterProvider";
import { DarkModeSync } from "@/components/DarkModeSync";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="
        bg-white dark:bg-gray-950
        text-gray-900 dark:text-gray-100
        transition-colors duration-300
      ">
        <AuthProvider>
          <UIProvider>
            <DarkModeSync />
            <SWRProvider>
              <ToasterProvider />
              <Header />
              <main>{children}</main>
              <Footer />
            </SWRProvider>
          </UIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
