import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { UIProvider } from "@/context/UIContext";
import SWRProvider from "@/context/SWRProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <AuthProvider>
          <UIProvider>
            <SWRProvider>
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
