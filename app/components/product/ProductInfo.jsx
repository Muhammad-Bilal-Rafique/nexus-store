"use client";
import React from "react";
// Add Star and Ruler to your imports
import { ShoppingCart, Minus, Plus, Star, Ruler } from "lucide-react";

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  handleQuantityChange,
    handleAddToCart,
    numberOfReviews,
    ratings

}) => {
  return (
    <div className="flex flex-col gap-4">
      
      {/* 1. HEADER: Category & Stars */}
      <div className="flex justify-between items-center">
        <span className="inline-flex items-center w-fit px-3 py-1 rounded-full bg-action/10 text-action text-xs font-bold uppercase tracking-widest border border-action/20">
          {product.category}
        </span>
        
        {/* ADDED: Star Rating */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
            <span className="font-bold text-text-primary">{ratings}</span>
            <Star className="w-4 h-4 fill-current" />
            <span className="text-text-primary/40 text-xs">({numberOfReviews} Reviews)</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary leading-none">
        {product.title}
      </h1>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-semibold text-text-primary/40 uppercase tracking-widest">
          Price
        </span>
        <span className="text-3xl font-black text-action">
          Rs {product.price.toLocaleString("en-PK")}
        </span>
      </div>

      {/* Description */}
      <p className="text-text-primary/60 leading-relaxed text-sm">
        {product.description}
      </p>

      {/* Colors (Kept your code) */}
      {product.colors?.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-text-primary/50">
              Color
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-text-primary">
              — {selectedColor}
            </span>
          </div>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full transition-all duration-200 shadow-sm ${
                  selectedColor === color
                    ? "border-2 border-action scale-110"
                    : "border hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Sizes */}
      {product.sizes?.length > 0 && (
        <div className="flex flex-col gap-2">
          {/* ADDED: Size Guide Link */}
          <div className="flex justify-between items-center">
             <span className="text-xs font-bold uppercase tracking-widest text-text-primary/50">
                Size — {selectedSize}
             </span>
             <button className="flex items-center gap-1 text-xs font-bold text-text-primary/40 hover:text-action transition">
                <Ruler className="w-3 h-3" /> Size Guide
             </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-[3rem] px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wide transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-action text-white shadow-md shadow-action/30 scale-105"
                    : "bg-gray-100 text-text-primary/60 hover:border-action/40 hover:text-action"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-xs font-black uppercase tracking-widest text-text-primary/40 mb-3.5">
          Quantity
        </h3>

        <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-3">
            <button
                onClick={() => handleQuantityChange("minus")}
                disabled={quantity <= 1}
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center border-2 border-text-primary/10 text-text-primary hover:border-action hover:text-action hover:bg-action/5 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
            >
                <Minus className="w-3.5 h-3.5" />
            </button>

            <span className="w-10 text-center font-black text-xl text-text-primary tabular-nums">
                {quantity}
            </span>

            <button
                onClick={() => handleQuantityChange("plus")}
                disabled={quantity >= product.stock}
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-action text-white hover:bg-action-hover disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-md shadow-action/30"
            >
                <Plus className="w-3.5 h-3.5" />
            </button>
            </div>
            
            {/* ADDED: Max Stock Warning */}
            {quantity >= product.stock && (
                <span className="text-xs font-bold text-red-500 animate-pulse">
                    Max Limit Reached!
                </span>
            )}
        </div>
      </div>

      {/* Add to Cart */}
      <button 
        onClick={handleAddToCart}
        className="cursor-pointer group relative w-full py-4 rounded-xl font-black uppercase tracking-widest text-sm overflow-hidden bg-action text-white transition-all duration-300 hover:bg-action-hover hover:shadow-lg hover:shadow-action/30 active:scale-[0.98]"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </span>
        <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </button>

      {/* ADDED: Trust Badge */}
      <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest text-text-primary/30 mt-2">
         <span>✓ Secure Checkout</span>
         <span>✓ Fast Delivery</span>
      </div>

    </div>
  );
};

export default ProductInfo;