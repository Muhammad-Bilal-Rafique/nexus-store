import ShopClient from "./ShopClient";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import connectDb from "@/lib/connectDb";
import Product from "@/models/Product"; 

export const revalidate = 60; // Cache the page for 60 seconds

async function getInitialProducts(searchParamsPromise) {
  const searchParams = await searchParamsPromise;
  const category = searchParams?.cat || "All Products";
  
  await connectDb();

  // Build the DB query directly
  let query = {};
  if (category !== "All Products") {
    query.category = category;
  }

  try {
    // Fetch directly from MongoDB, limit to 10 for initial load
    const fetchedProducts = await Product.find(query)
      .sort({ createdAt: -1 }) // Assuming "newest" sorting
      .limit(10)
      .lean();

    // Serialize ObjectIDs to strings (Next.js requirement)
    const products = fetchedProducts.map(p => ({
      ...p,
      _id: p._id.toString(),
      // Make sure to serialize any other ObjectIDs or Dates if needed
    }));

    // Simple check if there are more products (for the "Load More" button)
    const totalCount = await Product.countDocuments(query);
    const hasMore = totalCount > 10;

    return { products, hasMore };
  } catch (error) {
    console.error("Database fetch error:", error);
    return { products: [], hasMore: false };
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