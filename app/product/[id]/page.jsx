"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import { useCart } from "@/app/context/CartContext";
import ProductImageGallery from "@/app/components/product/ProductImageGallery";
import ProductInfo from "@/app/components/product/ProductInfo";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Reviews from "@/app/components/product/Reviews";

const ProductDetails = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { addToCart } = useCart();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ratings, setratings] = useState(0);
  const [reviews, setreviews] = useState([]);
  const [numberOfReviews, setnumberOfReviews] = useState(0);

  // Interaction states
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/productById/${id}`);
        
        setratings(response.data.averageRating);
        setnumberOfReviews(response.data.numReviews);

        setProduct(response.data);
        // Auto select first size and color
        if (response.data.sizes?.length > 0)
          setSelectedSize(response.data.sizes[0]);
        if (response.data.colors?.length > 0)
          setSelectedColor(response.data.colors[0]);
        //Fetch Ratings and Reviews
        const res = await axios.get(`/api/reviews/${id}`);
        setreviews(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  // Quantity Handler
  const handleQuantityChange = (type) => {
    if (type === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
    if (type === "plus" && quantity < product.stock)
      setQuantity((prev) => prev + 1);
  };

  // Add to Cart Handler
  const handleAddToCart = () => {
    if (!session) {
      router.push(`/login?callbackUrl=${encodeURIComponent(`/product/${id}`)}`);
      return;
    }
    if (!product) return;
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  // Loading State
  if (loading) {
    return (
      <div className="bg-bg-primary min-h-screen border flex flex-col">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-10 h-10 animate-spin text-action" />
        </div>
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="bg-bg-primary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col justify-center items-center text-center py-20">
          <h2 className="text-2xl font-black uppercase text-text-primary">
            Product Not Found
          </h2>
          <Link
            href="/shop"
            className="text-action hover:underline mt-4 block font-semibold"
          >
            Return to Store
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary/40 hover:text-action transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT: Images */}
          <ProductImageGallery
            images={product.images}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {/* RIGHT: Product Info */}
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
};

export default ProductDetails;
