
import React from 'react'
import Navbar from '@/app/components/layout/Navbar'
import HeroSection1 from '@/app/components/home/HeroSection1'
import FeaturedSection from '@/app/components/home/FeaturedSection'
import Footer from '@/app/components/layout/Footer'
import Categories from '@/app/components/home/Categories'


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection1 />
      <FeaturedSection />
      <Categories/>
      <Footer/>
    </div>
  )
}
