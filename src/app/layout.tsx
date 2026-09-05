import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/sites/eql/root/CartDrawer";
import NewsletterPopup from "@/components/sites/eql/root/NewsletterPopup";
import Chatbot from "@/components/sites/eql/root/Chatbot";

export const metadata: Metadata = {
  title: "EQL Apparel — Athleisure cao cấp",
  description: "Clone of EQL Apparel website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">
        <CartProvider>
          {children}
          <CartDrawer />
          <NewsletterPopup />
          <Chatbot />
        </CartProvider>
      </body>
    </html>
  );
}
