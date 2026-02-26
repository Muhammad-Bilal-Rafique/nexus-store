"use client";
import React from "react";
import { CheckCircle, MapPin, CreditCard } from "lucide-react";

const CheckoutForm = ({ register, errors, onSubmit }) => {
  // Common Error Color for better management
  const errorColor = "text-[#FF6B8A]";
  const errorBorder = "border-[#FF6B8A]";

  return (
    <form id="checkout-form" onSubmit={onSubmit} className="space-y-8">
      
      {/* 1. Contact Info */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tighter mb-6 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-action" /> Contact Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">Email</label>
            <input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              {...register("email", { 
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action transition-colors ${errors.email ? errorBorder : "border-gray-200"}`}
            />
            {errors.email && <p className={`text-xs ${errorColor} font-bold`}>{errors.email.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">Phone</label>
            <input 
              id="phone"
              type="tel" 
              placeholder="+92 300 1234567"
              {...register("phone", { required: "Phone is required" })}
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action transition-colors ${errors.phone ? errorBorder : "border-gray-200"}`}
            />
            {errors.phone && <p className={`text-xs ${errorColor} font-bold`}>{errors.phone.message}</p>}
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
              <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">First Name</label>
              <input 
                id="firstName"
                {...register("firstName", { required: "First name is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.firstName ? errorBorder : "border-gray-200"}`}
              />
              {errors.firstName && <p className={`text-xs ${errorColor} font-bold`}>{errors.firstName.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">Last Name</label>
              <input 
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.lastName ? errorBorder : "border-gray-200"}`}
              />
              {errors.lastName && <p className={`text-xs ${errorColor} font-bold`}>{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="address" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">Address</label>
            <input 
              id="address"
              placeholder="House 123, Street 4, Phase 5"
              {...register("address", { required: "Address is required" })}
              className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.address ? errorBorder : "border-gray-200"}`}
            />
            {errors.address && <p className={`text-xs ${errorColor} font-bold`}>{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="city" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">City</label>
              <input 
                id="city"
                {...register("city", { required: "City is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.city ? errorBorder : "border-gray-200"}`}
              />
              {errors.city && <p className={`text-xs ${errorColor} font-bold`}>{errors.city.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="postalCode" className="text-xs font-bold uppercase tracking-widest text-text-primary/60 block">Postal Code</label>
              <input 
                id="postalCode"
                {...register("postalCode", { required: "Postal Code is required" })}
                className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-action ${errors.postalCode ? errorBorder : "border-gray-200"}`}
              />
              {errors.postalCode && <p className={`text-xs ${errorColor} font-bold`}>{errors.postalCode.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Payment Method */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
         <h2 className="text-xl font-black uppercase tracking-tighter mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-action" /> Payment
        </h2>
        <div className="flex items-center gap-4 p-4 border-2 border-action bg-action/5 rounded-xl">
           <div className="w-4 h-4 rounded-full bg-action border-2 border-white ring-1 ring-action"></div>
           <span className="font-bold text-text-primary">Cash on Delivery (COD)</span>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;