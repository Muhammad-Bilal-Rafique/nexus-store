"use client";
import React, { useEffect, useState, Suspense } from "react"; // Added Suspense
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Phone, Mail, Package, Loader2 } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// 1. The Logic Component (Inside)
const OrderSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col justify-center py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            {/* BLOCK 1: Order Confirmation */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col items-center justify-center text-center">
              
              <div className="mb-8 relative">
                <div className="absolute inset-0 bg-state-success/20 rounded-full animate-ping opacity-75"></div>
                <div className="relative w-24 h-24 bg-state-success text-white rounded-full flex items-center justify-center shadow-lg shadow-state-success/40">
                  <CheckCircle className="w-12 h-12" strokeWidth={3} />
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-text-primary mb-4">
                Order Placed!
              </h1>
              
              <p className="text-text-primary/60 text-lg mb-8 max-w-sm leading-relaxed">
                Thank you for shopping with Nexus. Your order has been confirmed.
              </p>

              <div className="w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 relative group">
                <p className="text-xs font-bold uppercase tracking-widest text-text-primary/40 mb-2">
                  Order Reference
                </p>
                <p className="text-xl md:text-2xl font-mono font-bold text-action break-all">
                  #{orderId || "UNKNOWN"}
                </p>
              </div>

            </div>

            {/* BLOCK 2: Need Help */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-xl flex flex-col justify-between">
              
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-text-primary mb-6 flex items-center gap-3">
                   <Package className="w-8 h-8 text-action" /> Need Help?
                </h3>
                <p className="text-text-primary/60 mb-8 leading-relaxed">
                  We are here for you! If you have any questions about your order status or delivery, contact our support team directly.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-action/30 hover:shadow-md transition-all group">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-action group-hover:bg-action group-hover:text-white transition-colors">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Call / WhatsApp</p>
                        <p className="font-bold text-text-primary text-xl">0304 105 4477</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-5 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-action/30 hover:shadow-md transition-all group ">
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-action group-hover:bg-action group-hover:text-white transition-colors">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase text-gray-400 tracking-wider">Email Us</p>
                        <p className="font-bold text-text-primary text-lg truncate">bilalrafique271@gmail.com</p>
                      </div>
                  </div>
                </div>
              </div>

              <Link href="/shop" className="w-full">
                <button className="w-full py-5 bg-action text-white font-black uppercase tracking-widest text-sm rounded-xl hover:bg-action-hover transition-all shadow-xl shadow-action/20 cursor-pointer active:scale-95 flex items-center justify-center gap-3">
                  Continue Shopping <ArrowRight className="w-5 h-5" />
                </button>
              </Link>

            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// 2. The Main Page Component (The Wrapper)
const OrderSuccess = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 className="w-10 h-10 animate-spin text-action" />
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccess;