"use client";
import Link from "next/link";
import Image from "next/image";
import HeroFullBG from "@/public/HeroFullBG.png"

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-bg-secondary">
      
      {/* 1. BACKGROUND IMAGE (Stays Full Screen) */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={HeroFullBG}
          alt="Streetwear Model background"
          fill
          className="object-cover object-top" 
          priority
        />
      </div>
      <div className="absolute inset-0 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-24 md:pt-32 z-10">
        
        <div className="max-w-xl space-y-8 p-4 md:p-0">
            
            {/* Tag */}
            <div className="inline-block w-fit px-4 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
              <p className="text-nexus-color text-xs font-bold tracking-widest uppercase">
                Summer 2026
              </p>
            </div>
            
            {/* Headline */}
            <h1 className="text-6xl md:text-8xl font-black text-text-primary tracking-tight leading-[0.9] drop-shadow-sm">
              URBAN <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-nexus-color to-purple-400">
                REDEFINED.
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-text-primary font-medium text-lg md:text-xl leading-relaxed max-w-md drop-shadow-sm">
              The new collection is here. Premium materials, oversized fits, and zero compromises. 
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/shop" 
                className="px-10 py-4 bg-action text-white font-bold uppercase tracking-widest text-sm hover:bg-action-hover transition-all duration-200 rounded-lg shadow-xl shadow-purple-200/30 text-center"
              >
                Shop Now
              </Link>
              <Link 
                href="/about" 
                className="px-10 py-4 bg-white/90 backdrop-blur-sm border-2 border-gray-200 text-text-primary font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors duration-200 rounded-lg text-center"
              >
                Explore
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}