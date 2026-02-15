"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react"; 
import Men from "@/public/men.png"
import Women from "@/public/women.png"
import Accessories from "@/public/accessories.png"

export default function Categories() {
  return (
    <section className="w-full px-4 md:px-8 mb-24 mt-12">
      {/* Section Header */}
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-[var(--color-text-primary)] text-4xl md:text-6xl font-black tracking-tighter uppercase">
          Shop by <span className="text-[var(--color-nexus-color)]">Vibe</span>
        </h2>
        <Link 
            href="/shop" 
            className="hidden md:flex items-center gap-2 font-bold text-[var(--color-text-primary)] hover:text-[var(--color-nexus-color)] transition-colors"
        >
            View Full Collection <ArrowUpRight size={20} />
        </Link>
      </div>

      {/* The Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[80vh] max-h-[800px] gap-4">
        
        {/* MEN - Left Side (Tall) */}
        <Link href="/shop?cat=Men" className="relative group overflow-hidden w-full h-full rounded-2xl">
          <Image 
            src={Men} 
            alt="Men's Collection"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient Overlay: Makes text readable on bright images */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-8 left-8 flex items-end justify-between w-[calc(100%-4rem)]">
            <div>
                <p className="text-white/80 text-sm font-bold tracking-widest uppercase mb-2">Summer 2026</p>
                <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-nexus-color)] transition-colors">
                Men
                </h3>
            </div>
            {/* Floating Arrow Button */}
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-full group-hover:bg-[var(--color-nexus-color)] group-hover:text-white transition-all duration-300">
                <ArrowUpRight size={32} color="white" />
            </div>
          </div>
        </Link>

        {/* Right Side Container */}
        <div className="grid grid-rows-2 gap-4 h-full">
            
            {/* WOMEN - Top Right */}
            <Link href="/shop?cat=Women" className="relative group overflow-hidden w-full h-full rounded-2xl">
              <Image 
                src={Women}
                alt="Women's Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 w-full">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-nexus-color)] transition-colors">
                  Women
                </h3>
              </div>
            </Link>

            {/* ACCESSORIES - Bottom Right */}
            <Link href="/shop?cat=Accessories" className="relative group overflow-hidden w-full h-full rounded-2xl">
              <Image 
                src={Accessories}
                alt="Accessories Collection"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 w-full">
                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-[var(--color-nexus-color)] transition-colors">
                  Accessories
                </h3>
              </div>
            </Link>

        </div>

      </div>
    </section>
  )
}