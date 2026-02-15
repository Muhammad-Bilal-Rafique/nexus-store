"use client";
import React from "react";
import { CheckCircle, MapPin, CreditCard } from "lucide-react";

const CheckoutForm = ({ register, errors }) => {
  return (
    <div className="space-y-8">
      {/* 1. Contact Info */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-action" /> Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">Email</label>
            <input 
              type="email" 
              placeholder="you@example.com"
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              // 👇 FIX: Use your theme's error color hex (#FF6B8A)
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action transition-colors ${errors.email ? "border-[#FF6B8A]" : "border-gray-200"}`}
            />
            {/* 👇 FIX: Use your theme's error color hex */}
            {errors.email && <p className="text-xs text-[#FF6B8A] font-bold">{errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">Phone</label>
            <input 
              type="tel" 
              placeholder="+92 300 1234567"
              {...register("phone", { required: "Phone is required" })}
              // 👇 FIX
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action transition-colors ${errors.phone ? "border-[#FF6B8A]" : "border-gray-200"}`}
            />
            {/* 👇 FIX */}
            {errors.phone && <p className="text-xs text-[#FF6B8A] font-bold">{errors.phone.message}</p>}
          </div>
        </div>
      </div>

      {/* 2. Shipping Address */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-action" /> Shipping Address
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">First Name</label>
              <input 
                {...register("firstName", { required: "First name is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.firstName ? "border-[#FF6B8A]" : "border-gray-200"}`}
              />
              {errors.firstName && <p className="text-xs border-state-error font-bold">{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">Last Name</label>
              <input 
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.lastName ? "border-[#FF6B8A]" : "border-gray-200"}`}
              />
              {errors.lastName && <p className="text-xs text-[#FF6B8A] font-bold">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">Address</label>
            <input 
              placeholder="House 123, Street 4, Phase 5"
              {...register("address", { required: "Address is required" })}
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.address ? "border-[#FF6B8A]" : "border-gray-200"}`}
            />
            {errors.address && <p className="text-xs text-[#FF6B8A] font-bold">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">City</label>
              <input 
                {...register("city", { required: "City is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.city ? "border-[#FF6B8A]" : "border-gray-200"}`}
              />
              {errors.city && <p className="text-xs text-[#FF6B8A] font-bold">{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-primary/60">Postal Code</label>
              <input 
                {...register("postalCode", { required: "Postal Code is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.postalCode ? "border-[#FF6B8A]" : "border-gray-200"}`}
              />
              {errors.postalCode && <p className="text-xs text-[#FF6B8A] font-bold">{errors.postalCode.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Method */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm opacity-60 pointer-events-none">
         <h2 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-action" /> Payment
        </h2>
        <div className="flex items-center gap-4 p-4 border-2 border-action bg-action/5 rounded-xl">
           <div className="w-4 h-4 rounded-full bg-action border-2 border-white ring-1 ring-action"></div>
           <span className="font-bold text-text-primary">Cash on Delivery (COD)</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;