"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { X, Save, Loader2, UploadCloud,  } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditProductModal({ product, isOpen, onClose, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  // Load product data when modal opens
  useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id,
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        stock: product.stock || "",
        description: product.description || "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call your existing PUT API
      const { data } = await axios.put("/api/Admin/manageProducts", formData);
      
      toast.success("Product Updated!");
      onUpdate(data.product); // Update the list in parent immediately
      onClose(); // Close modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-xl font-black text-text-primary uppercase">Edit Product</h3>
          <button onClick={onClose} className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Title</label>
                <input 
                  type="text" name="title" value={formData.title} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nexus-color outline-none font-bold text-gray-700"
                />
              </div>
              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price</label>
                <input 
                  type="number" name="price" value={formData.price} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nexus-color outline-none font-bold text-gray-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                <select 
                  name="category" value={formData.category} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nexus-color outline-none font-bold text-gray-700"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Sale">Sale</option>
                </select>
              </div>
              {/* Stock */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Stock</label>
                <input 
                  type="number" name="stock" value={formData.stock} onChange={handleChange} required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nexus-color outline-none font-bold text-gray-700"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-1">Description</label>
                <textarea 
                    name="description" rows={3} value={formData.description} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-nexus-color outline-none text-gray-600 resize-none"
                />
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 flex gap-4">
                <button type="button" onClick={onClose} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors">
                    Cancel
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-nexus-color hover:bg-nexus-color/90 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                    {loading ? <Loader2 className="animate-spin" /> : <><Save size={18} /> Update Product</>}
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}