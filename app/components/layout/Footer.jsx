import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    // Removed extra parentheses and used clean Tailwind classes
    <footer className="bg-bg-secondary text-text-primary pt-20 pb-10 px-6 md:px-12 border-t border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <h2 className="text-3xl font-black tracking-tighter uppercase text-text-primary">Nexus</h2>
          <p className="text-gray-600 text-sm"> {/* Increased contrast from gray-500 to 600 */}
            Defining the future of urban streetwear. <br />
            Designed in Lahore.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-sm text-text-primary">Shop</h3>
          <div className="flex flex-col space-y-2 text-gray-600 text-sm">
            <Link href="/shop?cat=men" className="hover:text-nexus-color transition-colors">Men</Link>
            <Link href="/shop?cat=women" className="hover:text-nexus-color transition-colors">Women</Link>
            <Link href="/shop?cat=accessories" className="hover:text-nexus-color transition-colors">Accessories</Link>
            <Link href="/new-arrivals" className="hover:text-nexus-color transition-colors">New Arrivals</Link>
          </div>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-sm text-text-primary">Support</h3>
          <div className="flex flex-col space-y-2 text-gray-600 text-sm">
            <Link href="/contact" className="hover:text-nexus-color transition-colors">Contact Us</Link>
            <Link href="/faq" className="hover:text-nexus-color transition-colors">FAQs</Link>
            <Link href="/shipping" className="hover:text-nexus-color transition-colors">Shipping & Returns</Link>
          </div>
        </div>

        {/* Newsletter Column */}
        <div className="space-y-4">
          <h3 className="font-bold uppercase tracking-widest text-sm text-text-primary">Stay Updated</h3>
          <div className="flex flex-col gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-white border border-gray-300 text-text-primary px-4 py-3 text-sm focus:outline-none focus:border-nexus-color transition-colors"
            />
            {/* Swapped to White text on Dark Purple for 100% Accessibility Score */}
            <button className="bg-[#6b21a8] text-white font-bold uppercase tracking-widest text-xs py-3 hover:bg-purple-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 text-xs text-gray-500">
        <p>© 2026 NEXUS. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 text-text-primary">
            <Instagram size={20} className="hover:text-nexus-color cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-nexus-color cursor-pointer transition-colors" />
            <Facebook size={20} className="hover:text-nexus-color cursor-pointer transition-colors" />
        </div>
      </div>
    </footer>
  );
}