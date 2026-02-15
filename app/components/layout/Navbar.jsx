"use client";
import React, { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { User, Menu, X, ShoppingCart, LogOut, Phone } from 'lucide-react'; // Added Phone icon for contact
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from "@/app/context/CartContext";
import Logo from "@/public/Logo.png"
import Image from 'next/image';

const Navbar = () => {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Cart Logic
  const { getCartCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Helper for Active Link Styles
  const isActive = (path) => pathname === path ? "text-action font-bold" : "text-text-primary font-medium hover:text-action transition-colors";

  return (
    <nav className="fixed z-50 top-0 right-0 left-0 bg-bg-primary/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* 1. LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image src={Logo} alt="Nexus Logo" width={45} className="group-hover:animate-spin-slow transition-transform" />
            <span className="text-2xl font-black tracking-tighter text-text-primary">NEXUS</span>
          </Link>

          {/* 2. DESKTOP NAVIGATION (Customer Only) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={isActive("/")}>Home</Link>
            <Link href="/shop" className={isActive("/shop")}>Shop</Link>
            <Link href="/contact" className={isActive("/contact")}>Contact</Link>
          </div>

          {/* 3. ICONS & USER (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            
            {/* Cart Icon */}
            <Link href="/cart" className="relative group text-text-primary hover:text-action transition-colors duration-200">
              <ShoppingCart className="w-6 h-6" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-action text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce shadow-md shadow-action/30">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <div className="h-6 w-px bg-gray-200"></div>

            {/* User Profile */}
            {session ? (
              <div className="flex items-center gap-3 group relative">
                <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold text-text-primary">{session.user.name}</p>
                </div>
                
                <Link href="/orders">
                  <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center cursor-pointer hover:bg-action hover:text-white hover:border-action transition-all duration-200 shadow-sm">
                    <User className="w-5 h-5" />
                  </div>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <button className="px-6 py-2.5 bg-text-primary text-white text-sm font-bold uppercase tracking-wider rounded-full hover:bg-action hover:shadow-lg hover:shadow-action/20 transition-all active:scale-95">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* 4. MOBILE ACTIONS */}
          <div className="flex items-center gap-4 md:hidden">
             <Link href="/cart" className="relative text-text-primary">
              <ShoppingCart className="w-6 h-6" />
              {mounted && getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-action text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-text-primary hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl animate-in slide-in-from-top-5">
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-text-primary border-b border-gray-50 pb-2">Home</Link>
            <Link href="/shop" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-text-primary border-b border-gray-50 pb-2">Shop</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-lg font-bold text-text-primary border-b border-gray-50 pb-2">Contact</Link>
            
            <div className="pt-4 space-y-4">
              {session ? (
                <>
                    <Link href="/orders" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-action border border-gray-200">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-text-primary">My Profile</p>
                            <p className="text-xs text-gray-500">View Orders & Settings</p>
                        </div>
                    </Link>
                    <button onClick={() => signOut()} className="w-full py-3 text-red-500 font-bold bg-red-50 rounded-xl flex items-center justify-center gap-2">
                        <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full py-4 bg-action text-white font-bold rounded-xl shadow-lg shadow-action/20">
                    Login / Register
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar;