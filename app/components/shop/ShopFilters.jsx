"use client";

import { SlidersHorizontal, Star, Check } from "lucide-react";

// ACCEPTS PROPS (So the main Shop Page knows what to filter)
export default function ShopFilters({
  selectedCategory, setSelectedCategory,
  selectedSort, setSelectedSort,
  selectedSize, setSelectedSize,
  // selectedRating, setSelectedRating
}) {

  const categories = [
    "All Products", 
    "Men", 
    "Women", 
    "Accessories", 
  ];

  const sortOptions = [
    { label: "Newest Arrivals", value: "newest" },
    { label: "Price: Low to High", value: "low-high" },
    { label: "Price: High to Low", value: "high-low" },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  // KEEPING YOUR STAR LOGIC
  // const renderStars = (count) => {
  //   return [...Array(5)].map((_, i) => {
  //     const isActive = i < count;
  //     return (
  //       <Star 
  //         key={i} 
  //         size={14} 
  //         fill={isActive ? "#facc15" : "transparent"} 
  //         color={isActive ? "#facc15" : "#d1d5db"} 
  //       />
  //     );
  //   });
  // };

  return (
    <aside className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm ">
      
      {/* --- HEADER --- */}
      <div className="flex items-center justify-between pb-6 border-b border-gray-100 mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-action" />
          <h2 className="font-black text-sm uppercase tracking-wider text-text-primary">
            Filters
          </h2>
        </div>
        <button 
          onClick={() => {
            setSelectedCategory("All Products");
            setSelectedSort("newest");
            setSelectedSize("");
            // setSelectedRating(0);
          }}
          className="text-[10px] font-bold uppercase text-gray-600 hover:text-action transition-colors tracking-widest underline decoration-dotted underline-offset-4"
        >
          Reset
        </button>
      </div>

      {/* --- 1. CATEGORIES --- */}
      <div className="mb-8">
        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600 mb-4">
          Category
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li 
              key={cat} 
              onClick={() => {
                setSelectedCategory(cat)
              }}
              className={`cursor-pointer text-sm font-medium transition-all duration-200 py-2 px-3 rounded-md flex justify-between items-center group ${
                selectedCategory === cat 
                  ? "bg-gray-50 text-action font-bold" 
                  : "text-text-primary hover:bg-gray-50 hover:pl-4"
              }`}
            >
              {cat}
              {selectedCategory === cat && <Check size={14} />}
            </li>
          ))}
        </ul>
      </div>

      {/* --- 2. RATING  --- */}
      {/* <div className="mb-8">
        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600 mb-4">
          Rating
        </h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors">
              <input 
                type="radio" 
                name="rating" 
                checked={selectedRating === rating}
                onChange={() => setSelectedRating(rating)}
                className="w-4 h-4 accent-action cursor-pointer"
              />
              <div className="flex items-center gap-1">
                {renderStars(rating)}
                <span className="text-xs text-gray-500 font-medium ml-2"></span>
              </div>
            </label>
          ))}
        </div>
      </div> */}

      {/* --- 3. SORT BY --- */}
      <div className="mb-8">
        <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600 mb-4">
          Sort By
        </h3>
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
               <div className={`w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center transition-all ${
                 selectedSort === option.value ? "border-action" : "group-hover:border-gray-400"
               }`}>
                  {selectedSort === option.value && <div className="w-2 h-2 rounded-full bg-action" />}
               </div>
               <input 
                 type="radio" 
                 name="sort" 
                 value={option.value}
                 checked={selectedSort === option.value}
                 onChange={() => setSelectedSort(option.value)}
                 className="hidden" 
               />
               <span className={`text-sm ${selectedSort === option.value ? "text-action font-bold" : "text-gray-600 group-hover:text-black"}`}>
                 {option.label}
               </span>
            </label>
          ))}
        </div>
      </div>

      {/* --- 4. SIZES --- */}
      {selectedCategory !== "Accessories" && (
        <div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-gray-600 mb-4">
            Size
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {sizes.map((size) => (
            <button 
              key={size} 
              onClick={() => setSelectedSize(size === selectedSize ? "" : size)}
              className={`h-10 rounded-md text-xs font-bold transition-all border ${
                selectedSize === size
                  ? "bg-action text-white border-action shadow-md"
                  : "bg-white text-gray-600 border-gray-200 hover:border-action hover:text-action"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      )}
    </aside>
  );
}