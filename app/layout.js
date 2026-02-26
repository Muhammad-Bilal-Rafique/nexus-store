import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap' 
});

export const metadata = {
  title: "Nexus E-commerce",
  description: "High-quality portfolio project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Navbar />
          {children}
        <Footer />
        </Providers>
      </body>
    </html>
  );
}