import React from 'react'
import Logo from '@/public/Logo.png'

const page = ({heading, detail}) => {
  return (
    <div className="flex items-center text-center mb-10 gap-6">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="transform transition-transform group-hover:rotate-6">
          <img 
            src={Logo.src} 
            alt="Logo" 
            className="h-14 w-auto drop-shadow-lg" 
          />
        </div>
        <h1 className="text-3xl font-bold text-nexus-color tracking-wider transition-all group-hover:tracking-widest">
          NEXUS
        </h1>
      </div>

      {/* Vertical Divider Line */}
      <div className="w-px h-16 bg-linear-to-b from-transparent via-nexus-color to-transparent opacity-60"></div>

      {/* Heading and Detail Section */}
      <div className="space-y-2 text-left">
        <h2 className="text-2xl font-semibold text-text-primary">
          {heading}
        </h2>
        <p className="text-sm text-gray-500 font-light max-w-xs">
          {detail}
        </p>
      </div>
      
    </div>
  )
}

export default page