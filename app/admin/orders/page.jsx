"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, Search, Filter } from "lucide-react"; 
import AdminOrdersTable from "./components/AdminOrdersTable";
import OrderDetailModal from "./components/OrderDetailModal";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("/api/Admin/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map((order) => 
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      await axios.put("/api/Admin/orders/update", { orderId, status: newStatus });
    } catch (error) {
      console.error("Failed to update status:", error);
      fetchOrders();
    }
  };

  // Search Logic
  const filteredOrders = orders.filter((order) => {
    const term = searchTerm.toLowerCase();
    return (
      order._id.toLowerCase().includes(term) || // Search by ID
      order.customer.email.toLowerCase().includes(term) || // Search by Email
      order.customer.phone.includes(term) // Search by Phone
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-secondary">
        <Loader2 className="w-10 h-10 animate-spin text-action" />
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary min-h-screen">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 pt-24">
        
        {/* Header & Stats */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black text-text-primary uppercase tracking-tight">
              Orders
            </h1>
            <p className="text-text-primary/60 mt-1">Manage customer orders</p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Total Orders</p>
                <p className="text-xl font-black text-text-primary">{orders.length}</p>
             </div>
             <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-right">
                <p className="text-xs font-bold text-gray-400 uppercase">Revenue</p>
                <p className="text-xl font-black text-green-600">
                  Rs. {orders.reduce((acc, order) => acc + order.totalAmount, 0).toLocaleString()}
                </p>
             </div>
          </div>
        </div>

        {/* Search Bar Section */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by Order ID, Email, Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-action focus:ring-1 focus:ring-action transition-all font-medium text-sm"
            />
          </div>
        </div>

        {/* Table Component (Passing Filtered Orders) */}
        <AdminOrdersTable 
          orders={filteredOrders} // Pass filtered orders
          onViewDetails={setSelectedOrder} 
          onStatusUpdate={handleStatusUpdate}
        />

        {/* Modal Component */}
        {selectedOrder && (
          <OrderDetailModal 
            order={selectedOrder} 
            onClose={() => setSelectedOrder(null)} 
          />
        )}

      </div>
    </div>
  );
};

export default AdminOrdersPage;