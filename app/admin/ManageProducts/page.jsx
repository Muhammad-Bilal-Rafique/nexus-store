"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Loader2, Plus, Search, Edit2, Trash2, Package } from "lucide-react";
import { toast } from "react-hot-toast";

// IMPORT THE MODAL (Adjust path if needed)
import EditProductModal from "./components/EditProductModal";

const ManageProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // --- NEW STATE FOR EDITING ---
  const [editingProduct, setEditingProduct] = useState(null); // Stores the product currently being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/Admin/manageProducts");
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        setProducts([]); 
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await axios.delete(`/api/Admin/manageProducts?id=${id}`);
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  // --- CALLBACK: Update list instantly without refresh ---
  const handleUpdateSuccess = (updatedProduct) => {
    setProducts((prev) => 
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="min-h-screen bg-bg-secondary flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-nexus-color" /></div>;

  return (
    <div className="min-h-screen bg-bg-secondary p-4 sm:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">Inventory Management</h1>
          <p className="text-gray-500 font-medium">Total Products: <span className="text-nexus-color font-bold">{products.length}</span></p>
        </div>
        <Link href="/Dashboard/Add">
          <button className="flex items-center gap-2 bg-nexus-color hover:bg-nexus-color/90 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-nexus-color/20 transition-all active:scale-95">
            <Plus size={20} /> Add New Product
          </button>
        </Link>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
        <Search className="text-gray-400" />
        <input 
          type="text" placeholder="Search by name, category..." 
          className="flex-1 outline-none text-text-primary placeholder-gray-400 font-medium bg-transparent"
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-16 text-center flex flex-col items-center">
            <Package className="text-gray-300 w-10 h-10 mb-4" />
            <h3 className="text-lg font-bold text-gray-900">No products found</h3>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Product</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Stock Status</th>
                  <th className="p-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                           <img src={product.images?.[0] || product.image || "/placeholder.png"} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary text-sm sm:text-base">{product.title}</p>
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wide">{product.category || "General"}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-6"><p className="font-mono font-bold text-gray-700">Rs. {product.price?.toLocaleString()}</p></td>
                    <td className="p-6">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${ (product.stock || 0) > 0 ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"}`}>
                        {(product.stock || 0) > 0 ? `${product.stock} Units` : "Out of Stock"}
                      </div>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        
                        {/* EDIT BUTTON - OPENS MODAL */}
                        <button 
                          onClick={() => setEditingProduct(product)} 
                          className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-nexus-color hover:border-nexus-color hover:bg-nexus-color/5 rounded-xl transition-all shadow-sm"
                        >
                          <Edit2 size={16} />
                        </button>

                        <button 
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          className="p-2.5 bg-white border border-gray-200 text-gray-500 hover:text-red-500 hover:border-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm" 
                        >
                          {deletingId === product._id ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- RENDER MODAL --- */}
      <EditProductModal 
        isOpen={!!editingProduct} 
        product={editingProduct} 
        onClose={() => setEditingProduct(null)} 
        onUpdate={handleUpdateSuccess} 
      />

    </div>
  );
};

export default ManageProductsPage;