"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { useCart } from "@/app/context/CartContext";
import ProductImageGallery from "@/app/components/product/ProductImageGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import Reviews from "@/app/components/product/Reviews";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Notice how we receive the pre-fetched data as props!
export default function ProductDetailsClient({ product, reviews, ratings, numberOfReviews }) {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();

  // INTERACTION STATES ONLY. 
  // Notice we auto-select the first size/color using the prop data immediately!
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || "");

  const handleQuantityChange = (type) => {
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    if (type === "plus" && quantity < product.stock) setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/product/${product._id}`)}`);
      return;
    }
    if (!product) return;
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  // We completely removed the loading and error UI because the Server Component handles it!
  
  return (
    <div className="bg-bg-primary min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary/40 hover:text-action transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ProductImageGallery
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
          <ProductInfo
            product={product}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            quantity={quantity}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            ratings={ratings}
            numberOfReviews={numberOfReviews}
          />
        </div>
        <Reviews reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
}