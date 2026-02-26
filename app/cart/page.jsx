"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Loader2 } from "lucide-react";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-bg-primary min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-action" />
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen flex flex-col">
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-action mb-2">
            Review your cart items before checkout
          </p>
          <h1 className="text-5xl font-black uppercase tracking-tighter text-text-primary leading-none">
            Your Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          // EMPTY STATE
          <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Your bag is empty
            </h2>
            <p className="text-text-primary/60 mb-8 max-w-md">
              Looks like you haven't added any streetwear to your collection yet.
            </p>
            <Link 
              href="/shop" 
              className="px-8 py-3 bg-action text-white font-bold uppercase tracking-widest rounded-xl hover:bg-action-hover transition-all shadow-lg shadow-action/20 inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          // CART GRID
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              {cart.map((item, index) => (
                <div
                  key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                  className="flex gap-5 p-4 bg-bg-secondary rounded-2xl border border-text-primary/5 hover:border-action/20 hover:shadow-md hover:shadow-action/5 transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="shrink-0 rounded-xl overflow-hidden bg-gray-100 relative" style={{ width: "160px", height: "190px" }}>
                    <Image
                      src={item.images[0]}
                      alt={`${item.title} product shot`}
                      width={160}
                      height={190}
                      priority={index === 0} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-start py-1">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col gap-2">
                        <p className="font-black text-base uppercase tracking-tight text-text-primary leading-tight">
                          {item.title}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-text-primary/10 bg-bg-primary">
                            <span className="text-text-primary/40 text-xs font-bold uppercase tracking-widest">Size</span>
                            <span className="w-px h-3 bg-text-primary/20" />
                            <span className="text-text-primary font-black text-xs uppercase tracking-widest">{item.selectedSize || "N/A"}</span>
                          </div>
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-text-primary/10 bg-bg-primary">
                            <span className="text-text-primary/40 text-xs font-bold uppercase tracking-widest">Color</span>
                            <span className="w-px h-3 bg-text-primary/20" />
                            <span className="w-3 h-3 rounded-full border border-black/10 shrink-0" style={{ backgroundColor: item.selectedColor }} />
                            <span className="text-text-primary font-black text-xs uppercase tracking-widest">{item.selectedColor || "N/A"}</span>
                          </div>
                        </div>
                      </div>

                      <p className="font-black text-xl text-action shrink-0">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>

                    {/* Bottom: quantity + remove */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="inline-flex items-center gap-3">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item._id, item.selectedColor, item.selectedSize, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                          className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center border-2 border-text-primary/10 text-text-primary hover:border-action hover:text-action hover:bg-action/5 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-black text-sm text-text-primary tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item._id, item.selectedColor, item.selectedSize, Math.min(item.stock, item.quantity + 1))}
                          disabled={item.quantity >= item.stock}
                          className="cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-action text-white hover:bg-action-hover disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 active:scale-95 shadow-md shadow-action/30"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        aria-label="Remove item from cart"
                        onClick={() => removeFromCart(item._id, item.selectedColor, item.selectedSize)}
                        className="border-2 p-2 rounded-lg text-state-error cursor-pointer hover:bg-state-error/10 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="lg:col-span-4 bg-bg-secondary rounded-lg border border-action overflow-hidden sticky top-32">
              <div className="px-8 pt-8 pb-6 border-b border-text-primary/5">
                <p className="text-xs font-bold uppercase tracking-widest text-action mb-1">Ready to order?</p>
                <h2 className="text-2xl font-black uppercase tracking-tighter text-text-primary">
                  Order Summary
                </h2>
              </div>

              <div className="px-8 py-6 flex flex-col gap-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-primary/50 font-medium">Subtotal</span>
                  <span className="font-black text-text-primary">Rs. {getCartTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-text-primary/50 font-medium">Shipping</span>
                  <span className="font-black text-state-success">Free</span>
                </div>

                <div className="h-0.5 bg-linear-to-r from-transparent via-action/30 to-transparent" />

                <div className="flex justify-between items-center">
                  <span className="font-black uppercase tracking-tight text-text-primary">Total</span>
                  <span className="font-black text-2xl text-action">Rs. {getCartTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="px-8 pb-10 flex flex-col gap-4">
                <Link 
                  href="/checkout" 
                  className="cursor-pointer group relative w-full py-4 bg-action text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-action-hover transition-all shadow-lg shadow-action/20 active:scale-95 flex items-center justify-center gap-2 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Order Now <ArrowRight className="w-4 h-4" />
                  </span>
                  <span className="absolute inset-0 translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-xs text-text-primary/30 font-medium">
                  <ShoppingBag className="w-3 h-3" />
                  <span>Secure Checkout powered by Nexus</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;