"use client";
import { useState, useEffect } from "react";
import ProductCard from "../shop/ProductCard";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import axios from "axios";

export default function FeaturedSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // The function to call our new API
    const fetchDrops = async () => {
      try {
        const res = await axios.get("/api/newDrops")
        setProducts(res.data);
        // console.log("Fetched drops:", res.data);
        
        
      } catch (error) {
        console.error("Failed to fetch drops", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDrops();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 flex justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-gray-400" />
      </section>
    );
  }

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">New Drops</h2>
        <Link href="/shop" className="hidden md:block text-sm font-bold underline underline-offset-4">View All</Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}