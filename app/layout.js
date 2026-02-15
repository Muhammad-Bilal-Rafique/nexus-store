"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext"; 
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
        <CartProvider>
          {children}
        </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}