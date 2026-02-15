"use client";

import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }) {

  return (
    <Link href={`/product/${product._id}`} className="group cursor-pointer block">

      <div className="relative w-full aspect-[3/4] overflow-hidden bg-bg-secondary mb-4 rounded-sm">
        <Image 
          src={product.images?.[0] || "/placeholder.jpg"} 
          alt={product.title || "Product Image"}
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 25vw"
        />
        
        {/* Quick Add / View Details Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {/* 👇 CHANGED to <div> to avoid "button inside link" error */}
          <div 
            className="w-full bg-action text-white font-bold py-3 uppercase text-xs tracking-widest hover:bg-action-hover transition-colors shadow-lg text-center"
          >
            View Details
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="text-sm font-bold uppercase tracking-wide text-text-primary group-hover:text-action transition-colors truncate">
          {product.title}
        </h3>
        <p className="text-sm text-text-primary/60">PKR {product.price}</p>
      </div>
    </Link>
  );
}