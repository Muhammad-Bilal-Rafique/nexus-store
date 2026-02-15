"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Upload, X, Loader2 } from "lucide-react";

// PREDEFINED SIZES (Only for Clothing)
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AddProductPage() {
  const router = useRouter();

  // 1. SETUP FORM
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "Men",
      stock: 0,
      sizes: [],
      colors: [],
    },
  });

  // WATCHERS (Real-time listeners)
  const selectedCategory = watch("category");
  const selectedSizes = watch("sizes");
  const selectedColors = watch("colors");

  // STATE
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [tempColor, setTempColor] = useState(""); // For typing new colors

  // --- 2. COLOR FUNCTIONS (Dynamic Input) ---
  const handleAddColor = (e) => {
    e.preventDefault(); // Prevent form submit
    if (!tempColor.trim()) return;

    const currentColors = selectedColors || [];
    // Prevent duplicates
    if (!currentColors.includes(tempColor)) {
      setValue("colors", [...currentColors, tempColor]);
    }
    setTempColor(""); // Clear input
  };

  const removeColor = (colorToRemove) => {
    setValue("colors", selectedColors.filter((c) => c !== colorToRemove));
  };

  // --- 3. SIZE FUNCTIONS ---
  const toggleSize = (size) => {
    const current = selectedSizes || [];
    if (current.includes(size)) {
      setValue("sizes", current.filter((s) => s !== size));
    } else {
      setValue("sizes", [...current, size]);
    }
  };

  // --- 4. IMAGE FUNCTIONS ---
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setImages((prev) => [...prev, ...files]);

    // Create local previews
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
        throw new Error("Cloudinary Preset is missing in .env file");
    }

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      data
    );
    return res.data.secure_url;
  };

  // --- 5. SUBMIT HANDLER ---
  const onSubmit = async (data) => {
    try {
      // A. Upload Images First
      const uploadedImageUrls = await Promise.all(
        images.map((img) => uploadToCloudinary(img))
      );

      // B. Prepare Data (Clean up based on category)
      const finalData = {
        ...data,
        // If Accessories, force sizes to be empty
        sizes: data.category === "Accessories" ? [] : data.sizes,
        images: uploadedImageUrls,
      };

      // C. Send to Backend
      await axios.post("/api/Admin/AddProducts", finalData);

      alert("Product Created Successfully!");
      router.push("/shop");
    } catch (error) {
      console.error("Error:", error);
      const msg = error.response?.data?.message || error.message || "Something went wrong";
      alert("Error: " + msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      <div className="max-w-4xl mx-auto px-6 pt-32">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-8">Add New Product</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-sm space-y-8">
          
          {/* --- IMAGES SECTION --- */}
          <div className="space-y-4">
            <label className="block text-sm font-bold uppercase tracking-widest text-gray-500">Product Images</label>
            <div className="flex flex-wrap gap-4 mt-2">
              
              {/* Previews (Fixed CSS: No overflow-hidden on parent) */}
              {imagePreviews.map((src, i) => (
                <div key={i} className="relative w-32 h-40">
                  <img 
                    src={src} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-xl border border-gray-200 shadow-sm" 
                  />
                  {/* Floating Remove Button */}
                  <button 
                    type="button" 
                    onClick={() => removeImage(i)}
                    className="absolute top-0 right-0 z-50 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md border-2 border-white hover:scale-110 transition-transform"
                  >
                    <X size={12} strokeWidth={3} />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              <label className="w-32 h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-black hover:text-black transition-colors">
                <Upload size={24} className="mb-2" />
                <span className="text-xs font-bold uppercase">Upload</span>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>
          </div>

          {/* --- BASIC INFO --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Title</label>
              <input 
                {...register("title", { required: "Title is required" })} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-none" 
                placeholder="e.g. Oversized Cyber Hoodie"
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Price (PKR)</label>
              <input 
                type="number" 
                {...register("price", { required: "Price is required", valueAsNumber: true })} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-none" 
                placeholder="4500"
              />
              {errors.price && <p className="text-red-500 text-xs">{errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
            <textarea 
              rows="4" 
              {...register("description", { required: "Description is required" })} 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-none" 
              placeholder="Product details..."
            />
          </div>

          {/* --- SMART SECTIONS (Category Dependent) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 1. SIZES (Hidden if Accessories) */}
            {selectedCategory !== "Accessories" && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Available Sizes</label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`w-10 h-10 rounded-md font-bold text-sm transition-all border ${
                        selectedSizes?.includes(size)
                          ? "bg-black text-white border-black"
                          : "bg-white text-gray-500 border-gray-200 hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. COLORS (Dynamic Tag Input) */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Available Colors</label>
              <div className="space-y-3">
                
                {/* Input Field */}
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={tempColor}
                    onChange={(e) => setTempColor(e.target.value)}
                    placeholder="Type color (e.g. Red, #000000)"
                    className="flex-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:border-black focus:outline-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault(); // Stop default submit
                        handleAddColor(e);
                      }
                    }}
                  />
                  <button 
                    type="button"
                    onClick={handleAddColor}
                    className="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-800"
                  >
                    Add
                  </button>
                </div>

                {/* Selected Tags */}
                <div className="flex flex-wrap gap-2">
                  {selectedColors?.length === 0 && (
                    <span className="text-xs text-gray-400 italic">No colors added.</span>
                  )}
                  {selectedColors?.map((color, index) => (
                    <div key={index} className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 rounded-full shadow-sm">
                      {/* Color Dot Preview */}
                      <div className="w-3 h-3 rounded-full border border-gray-100" style={{ backgroundColor: color }} />
                      <span className="text-xs font-bold text-gray-700">{color}</span>
                      <button type="button" onClick={() => removeColor(color)} className="text-gray-400 hover:text-red-500 ml-1">
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- CATEGORY & STOCK --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
              <select {...register("category")} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-none">
                <option value="Men">Men Streetwear</option>
                <option value="Women">Women Collection</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Stock</label>
              <input 
                type="number" 
                {...register("stock", { valueAsNumber: true })} 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:outline-none" 
              />
            </div>
          </div>

          {/* --- SUBMIT BUTTON --- */}
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full h-14 cursor-pointer bg-black text-white font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-lg"
          >
            {isSubmitting ? <><Loader2 className="animate-spin" /> Saving Product...</> : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
}