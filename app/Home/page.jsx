import React from 'react'
import Navbar from '@/app/components/layout/Navbar'
import HeroSection1 from '@/app/components/home/HeroSection1'
import FeaturedSection from '@/app/components/home/FeaturedSection'
import Footer from '@/app/components/layout/Footer'
import Categories from '@/app/components/home/Categories'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection1 />
        
        {/* Categories load instantly as they don't fetch data */}
        <Categories />

        {/* FeaturedSection stays at the bottom or middle, wrapped in Suspense */}
        <Suspense fallback={
          <div className="py-24 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="animate-spin w-10 h-10 text-nexus-color" />
            <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Fetching New Drops...</p>
          </div>
        }>
          <FeaturedSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}