"use client";
import React from "react";
import { Eye, Clock, Truck, CheckCircle, XCircle, PackageCheck } from "lucide-react";

const AdminOrdersTable = ({ orders, onViewDetails, onStatusUpdate }) => {
  
  // 1. Helper to get the correct color classes
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Processing": return "bg-blue-100 text-blue-700 border-blue-200";
      case "Shipped": return "bg-purple-100 text-purple-700 border-purple-200";
      case "Delivered": return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  // 2. Helper to get the correct Icon
  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending": return <Clock className="w-3.5 h-3.5" />;
      case "Processing": return <PackageCheck className="w-3.5 h-3.5" />;
      case "Shipped": return <Truck className="w-3.5 h-3.5" />;
      case "Delivered": return <CheckCircle className="w-3.5 h-3.5" />;
      case "Cancelled": return <XCircle className="w-3.5 h-3.5" />;
      default: return <Clock className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase tracking-widest text-gray-500">
              <th className="p-6 font-bold">Order ID</th>
              <th className="p-6 font-bold">Customer</th>
              <th className="p-6 font-bold">Date</th>
              <th className="p-6 font-bold">Total</th>
              <th className="p-6 font-bold">Status</th>
              <th className="p-6 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                  
                  {/* Order ID */}
                  <td className="p-6">
                    <span className="font-mono text-xs font-bold text-gray-400">{order._id}</span>
                  </td>

                  {/* Customer */}
                  <td className="p-6">
                    <p className="font-bold text-text-primary text-sm">
                      {order.customer.firstName} {order.customer.lastName}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{order.customer.email}</p>
                  </td>

                  {/* Date */}
                  <td className="p-6">
                    <p className="text-sm font-medium text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="p-6">
                    <p className="font-black text-text-primary">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold">{order.paymentMethod}</p>
                  </td>

                  {/* Status Dropdown (With Icons & Colors) */}
                  <td className="p-6">
                     <div className="relative inline-block w-40">
                        {/* The Icon (Positioned absolutely on top of the select) */}
                        <div className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 z-10 ${
                            order.status === 'Pending' ? 'text-yellow-700' :
                            order.status === 'Shipped' ? 'text-purple-700' :
                            order.status === 'Delivered' ? 'text-green-700' :
                            order.status === 'Cancelled' ? 'text-red-700' : 'text-gray-700'
                        }`}>
                            {getStatusIcon(order.status)}
                        </div>

                        <select
                          value={order.status}
                          onChange={(e) => onStatusUpdate(order._id, e.target.value)}
                          className={`appearance-none w-full text-xs font-bold uppercase tracking-wide py-2 pl-9 pr-8 rounded-lg focus:outline-none cursor-pointer border transition-colors ${getStatusColor(order.status)}`}
                        >
                          <option className="bg-white text-gray-900" value="Pending">Pending</option>
                          <option className="bg-white text-gray-900" value="Processing">Processing</option>
                          <option  className="bg-white text-gray-900"value="Shipped">Shipped</option>
                          <option className="bg-white text-gray-900" value="Delivered">Delivered</option>
                          <option className="bg-white text-gray-900" value="Cancelled">Cancelled</option>
                        </select>
                        
                        {/* Custom Dropdown Arrow */}
                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 z-10 text-gray-400">
                           <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                             <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                           </svg>
                        </div>
                     </div>
                  </td>

                  {/* Actions Button */}
                  <td className="p-6 text-right">
                    <button 
                      onClick={() => onViewDetails(order)}
                      className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider text-gray-600 hover:bg-action hover:text-white hover:border-action transition-all shadow-sm"
                    >
                      <Eye className="w-3.5 h-3.5" /> Details
                    </button>
                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-12 text-center text-gray-400">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersTable;