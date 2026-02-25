
import ShopClient from "./ShopClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

async function getInitialProducts(searchParams) {
  const category = searchParams?.cat || "All Products";
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  
  try {
    const res = await fetch(`${baseUrl}/api/products?page=1&sort=newest&category=${category}`, {
      cache: "no-store", 
    });
    if (!res.ok) return { products: [], hasMore: false };
    return res.json();
  } catch (error) {
    console.error("Server fetch error:", error);
    return { products: [], hasIcon: false };
  }
}

export default async function ShopPage({ searchParams }) {
  const initialData = await getInitialProducts(searchParams);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-10 h-10 text-action" />
      </div>
    }>
      <ShopClient initialData={initialData} />
    </Suspense>
  );
}