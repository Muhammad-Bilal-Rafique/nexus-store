"use client";

import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import ProductImageGallery from "@/app/components/product/ProductImageGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import Reviews from "@/app/components/product/Reviews";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Notice how we receive the pre-fetched data as props!
export default function ProductDetailsClient({ product}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const ratings = product?.averageRating || 0;
  const numberOfReviews = product?.numReviews || 0;
  

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

  
  return (
    <div className="bg-bg-primary min-h-screen">
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary hover:text-action transition-colors mb-8"
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
      </main>
    </div>
  );
}