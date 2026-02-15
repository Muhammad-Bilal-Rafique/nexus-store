"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ProductCard from "@/app/components/shop/ProductCard";
import ShopFilters from "@/app/components/shop/ShopFilters";
import { useSearchParams } from "next/navigation";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
 const searchParams = useSearchParams();
 const initialCategory = searchParams.get("cat") || "All Products";
  
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // --- 1. FILTER STATE (Lifted Up from ShopFilters) ---
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRating, setSelectedRating] = useState(0); // For your Star Rating

  // --- 2. FETCH FUNCTION ---
  // Accepts 'reset' to clear list when filtering
  // --- FETCH FUNCTION (UPDATED) ---
  const fetchProducts = async (pageNum, reset = false) => {
    try {
      // 1. Prepare parameters to send to backend
      const params = {
        page: pageNum,
        sort: selectedSort, // Send active sort
      };

      // Only send category if it's NOT "All Products"
      if (selectedCategory !== "All Products") {
        params.category = selectedCategory;
      }

      // Only send size if one is selected
      if (selectedSize) {
        params.size = selectedSize;
      }

      // Only send rating if > 0
      if (selectedRating > 0) {
        params.rating = selectedRating;
      }

      // 2. Call API with these params
      // Axios converts this to: /api/products?page=1&category=Men&size=XL...
      const res = await axios.get("/api/products", { params });

      // 3. Handle Data
      if (pageNum === 1 || reset) {
        // If it's a new filter or page 1, overwrite the list
        setProducts(res.data.products);
      } else {
        // If it's "Load More", add to the bottom
        setProducts((prev) => [...prev, ...res.data.products]);
      }

      setHasMore(res.data.hasMore);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  // --- 3. FILTER LISTENER ---
  // Refetch whenever a filter changes
  useEffect(() => {
    setLoading(true);
    setPage(1)
    fetchProducts(1, true);
  }, [selectedCategory, selectedSort, selectedSize, selectedRating]);

  // Handle Load More
  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  // Helper to clear specific filter tags
  const clearFilter = (type) => {
    if (type === "category") setSelectedCategory("All Products");
    if (type === "size") setSelectedSize("");
    if (type === "sort") setSelectedSort("newest");
    if (type === "rating") setSelectedRating(0);
  };

  return (
    <div className="bg-bg-primary min-h-screen flex flex-col">
      <Navbar />
      <div className="MainContainer flex mb-3">
      <div>
        <aside className="sticky top-0 fade-in slide-in-from-left-4 duration-300">
          <ShopFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
        </aside>
      </div>
      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* SIDEBAR - NOW PASSING PROPS DOWN! */}

        <div>
          {/* HEADER SECTION */}
          <div className="mb-8 flex flex-row-reverse md:flex-row-reverse  justify-between gap-6 border-b border-gray-100 pb-8">
            <div className="text-center w-full md:text-left">
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-text-primary">
                Shop All
              </h1>
              <p className="text-text-primary/60 max-w-md mx-auto md:mx-0">
                Explore our latest collection of streetwear, accessories, and
                exclusive drops.
              </p>
            </div>
          </div>

          {/* --- 4. ACTIVE FILTER CHIPS (Shows what is selected) --- */}
          {(selectedCategory !== "All Products" ||
            selectedSize ||
            selectedRating > 0 ||
            selectedSort !== "newest") && (
            <div className="flex flex-wrap justify-center items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
              <span className="text-xs font-bold text-gray-400 self-center mr-2 uppercase tracking-wider">
                Active Filters:
              </span>

              {/* Category Tag */}
              {selectedCategory !== "All Products" && (
                <button
                  onClick={() => clearFilter("category")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                >
                  {selectedCategory} <X size={12} />
                </button>
              )}

              {/* Size Tag */}
              {selectedSize && (
                <button
                  onClick={() => clearFilter("size")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                >
                  Size: {selectedSize} <X size={12} />
                </button>
              )}

              {/* Sort Tag */}
              {selectedSort !== "newest" && (
                <button
                  onClick={() => clearFilter("sort")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                >
                  Sort: {selectedSort} <X size={12} />
                </button>
              )}

              {/* Rating Tag */}
              {selectedRating > 0 && (
                <button
                  onClick={() => clearFilter("rating")}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                >
                  {selectedRating}+ Stars <X size={12} />
                </button>
              )}

              {/* Clear All Link */}
              <button
                onClick={() => {
                  setSelectedCategory("All Products");
                  setSelectedSize("");
                  setSelectedRating(0);
                  setSelectedSort("newest");
                }}
                className="text-xs font-bold text-action underline decoration-dotted underline-offset-4 ml-2"
              >
                Clear All
              </button>
            </div>
          )}

          {/* MAIN LAYOUT */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* PRODUCT GRID */}
            <div
              className={`w-full md:w-3/4" : "md:w-full transition-all duration-300`}
            >
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loader2 className="animate-spin w-10 h-10 text-action" />
                </div>
              ) : (
                <>
                  <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                    ) : (
                      <p className="col-span-full text-center text-text-primary/60 py-20">
                        No products found.
                      </p>
                    )}
                  </div>

                  {hasMore && (
                    <div className="mt-16 flex justify-center">
                      <button
                        onClick={handleLoadMore}
                        disabled={loadingMore}
                        className="px-8 py-3 bg-action text-white font-bold uppercase tracking-widest text-xs hover:bg-action-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {loadingMore ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin w-4 h-4" />{" "}
                            Loading...
                          </span>
                        ) : (
                          "Load More Products"
                        )}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
</div>
      <Footer />
    </div>
  );
}
