import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap' // This ensures text is visible while the font loads
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
          {children}
        </Providers>
      </body>
    </html>
  );
}