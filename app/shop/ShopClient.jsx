"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Loader2, X } from "lucide-react";
import ProductCard from "@/app/components/shop/ProductCard";
import ShopFilters from "@/app/components/shop/ShopFilters";
import { useSearchParams } from "next/navigation";

// 1. Initial Data Props mein receive karein
export default function ShopClient({ initialData }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "All Products";

  // 2. State ko initialData se initialize karein
  const [products, setProducts] = useState(initialData?.products || []);
  const [hasMore, setHasMore] = useState(initialData?.hasMore || false);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  // --- FILTER STATE ---
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState("newest");
  const [selectedSize, setSelectedSize] = useState("");

  // --- FETCH FUNCTION ---
  const fetchProducts = async (pageNum, reset = false) => {
    try {
      const params = {
        page: pageNum,
        sort: selectedSort,
      };

      if (selectedCategory !== "All Products") {
        params.category = selectedCategory;
      }
      if (selectedSize) {
        params.size = selectedSize;
      }

      const res = await axios.get("/api/products", { params });

      if (pageNum === 1 || reset) {
        setProducts(res.data.products);
      } else {
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

  // --- FILTER LISTENER ---
  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return;
    }

    setLoading(true);
    setPage(1);
    fetchProducts(1, true);
  }, [selectedCategory, selectedSort, selectedSize]);

  // Handle Load More
  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  // Helper to clear filters
  const clearFilter = (type) => {
    if (type === "category") setSelectedCategory("All Products");
    if (type === "size") setSelectedSize("");
    if (type === "sort") setSelectedSort("newest");
  };

  return (
    <div className="bg-bg-primary min-h-screen flex flex-col">
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
            />
          </aside>
        </div>
        <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
          <div>
            {/* HEADER SECTION */}
            <div className="mb-8 flex flex-row-reverse md:flex-row-reverse justify-between gap-6 border-b border-gray-100 pb-8">
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

            {/* --- ACTIVE FILTER CHIPS --- */}
            {(selectedCategory !== "All Products" ||
              selectedSize ||
              selectedSort !== "newest") && (
              <div className="flex flex-wrap justify-center items-center gap-3 mb-8 animate-in fade-in slide-in-from-top-2">
                <span className="text-xs font-bold text-gray-600 self-center mr-2 uppercase tracking-wider">
                  Active Filters:
                </span>

                {selectedCategory !== "All Products" && (
                  <button
                    onClick={() => clearFilter("category")}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                  >
                    {selectedCategory} <X size={12} />
                  </button>
                )}

                {selectedSize && (
                  <button
                    onClick={() => clearFilter("size")}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                  >
                    Size: {selectedSize} <X size={12} />
                  </button>
                )}

                {selectedSort !== "newest" && (
                  <button
                    onClick={() => clearFilter("sort")}
                    className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-200 text-xs font-bold uppercase rounded-full hover:border-red-500 hover:text-red-500 transition-colors shadow-sm"
                  >
                    Sort: {selectedSort} <X size={12} />
                  </button>
                )}

                <button
                  onClick={() => {
                    setSelectedCategory("All Products");
                    setSelectedSize("");
                    setSelectedSort("newest");
                  }}
                  className="text-xs font-bold text-action underline decoration-dotted underline-offset-4 ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* MAIN LAYOUT & PRODUCT GRID */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full transition-all duration-300">
                {loading ? (
                  <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="animate-pulse flex flex-col gap-4"
                      >
                        <div className="bg-gray-200 w-full aspect-3/4 rounded-sm"></div>
                        <div className="space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {products.length > 0 ? (
                        products.map((product, index) => (
                          <ProductCard
                            key={product._id}
                            product={product}
                            // 4. Pehli 4 images ko high priority de rahe hain taake foran load hon
                            priority={index < 4}
                          />
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
                          className="px-8 py-3 bg-action text-black font-bold uppercase tracking-widest text-xs hover:bg-action-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
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
    </div>
  );
}
