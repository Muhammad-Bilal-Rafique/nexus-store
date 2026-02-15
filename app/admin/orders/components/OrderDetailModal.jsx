"use client";
import React from "react";
import { X, User, MapPin, Package, Phone, Mail } from "lucide-react";

const OrderDetailModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Content */}
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tight text-text-primary">
              Order Details
            </h2>
            <p className="text-sm text-gray-400 font-mono mt-1">ID: #{order._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X className="w-10 h-10 cursor-pointer bg-action text-white rounded-full " />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* 1. Customer & Shipping Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Customer Details */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-action" /> Customer
              </h3>
              <div className="space-y-3 text-sm">
                <p className="font-bold text-lg text-text-primary">{order.customer.firstName} {order.customer.lastName}</p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-3.5 h-3.5" /> 
                  <a href={`mailto:${order.customer.email}`} className="hover:text-action">{order.customer.email}</a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3.5 h-3.5" /> 
                  <a href={`tel:${order.customer.phone}`} className="hover:text-action">{order.customer.phone}</a>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <h3 className="font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-action" /> Shipping Address
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {order.customer.address}
              </p>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold uppercase text-gray-500">
                  {order.customer.city}
                </span>
                <span className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-bold uppercase text-gray-500">
                  {order.customer.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Order Items (The Product Details you wanted) */}
          <div>
            <h3 className="font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2">
              <Package className="w-4 h-4 text-action" /> Order Items
            </h3>
            
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-bold border-b border-gray-100">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4 text-center">Color/Size</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item, index) => (
                    <tr key={index} className="bg-white hover:bg-gray-50/50">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-bold text-text-primary text-sm">{item.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex gap-2">
                          {item.selectedColor && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 capitalize">
                              {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-600 uppercase">
                              {item.selectedSize}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-center font-mono font-bold text-sm">
                        x{item.quantity}
                      </td>
                      <td className="p-4 text-right font-bold text-sm">
                        Rs. {(item.price * item.quantity).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. Summary Footer */}
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <div className="w-full max-w-xs space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600 font-bold">Free</span>
              </div>
              <div className="flex justify-between text-xl font-black text-text-primary pt-3 border-t border-gray-100">
                <span>Total</span>
                <span className="text-action">Rs. {order.totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;