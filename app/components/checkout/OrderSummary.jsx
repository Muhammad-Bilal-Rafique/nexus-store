"use client";
import React from "react";
import { Truck, Loader2 } from "lucide-react";


const OrderSummary = ({ cart, total, loading }) => {


  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl lg:sticky lg:top-32">
      <h3 className="text-xl font-black uppercase tracking-tighter mb-6">Your Order</h3>
      
      {/* Mini Cart Items */}
      <div className="space-y-4 mb-8 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
        {cart.map((item) => (
           <div key={`${item._id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 items-center">
              <div className="w-16 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                 <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                 <h4 className="font-bold text-sm text-text-primary line-clamp-1">{item.title}</h4>
                 <p className="text-xs text-text-primary/50 font-medium mt-1">
                   {item.selectedSize} | {item.selectedColor}
                   <span className="ml-2">x{item.quantity}</span>
                 </p>
              </div>
              <p className="font-bold text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</p>
           </div>
        ))}
      </div>

      <div className="h-px bg-gray-100 my-6"></div>

      {/* Totals */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-between text-sm text-text-primary/70">
          <span>Subtotal</span>
          <span className="font-bold">Rs. {total.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm text-text-primary/70">
          <span>Shipping</span>
          <span className="text-green-600 font-bold">Free</span>
        </div>
        <div className="flex justify-between text-xl font-black text-text-primary mt-4 pt-4 border-t border-gray-100">
          <span>Total</span>
          <span className="text-action">Rs. {total.toLocaleString()}</span>
        </div>
      </div>

      {/* Confirm Button 
         IMP: `form="checkout-form"` connects this button to the form in the other component
      */}
      <button 
        type="submit"
        form="checkout-form" 
        disabled={loading}
        className="w-full py-4 bg-action text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-action-hover transition-all shadow-lg shadow-action/20 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>Processing <Loader2 className="w-4 h-4 animate-spin" /></>
        ) : (
          <>Confirm Order <Truck className="w-5 h-5" /></>
        )}
      </button>

      <div className="mt-4 text-center">
         <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">
            Secure Order powered by Nexus
         </p>
      </div>

    </div>
  );
};

export default OrderSummary;