"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { ShoppingBag } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useSession } from "next-auth/react";

// Import Components
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";

const CheckoutPage = () => {
  const { data: session, status } = useSession(); // Add status
  const { cart, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/checkout");
    }
  }, [status, router]);

  // Submit Handler
  const onSubmit = async (data) => {
    // Double-check authentication
    if (!session) {
      router.push("/login?callbackUrl=/checkout");
      return;
    }

    setLoading(true);

    const orderData = {
      customer: {
        ...data,
        email: session.user?.email, // Add user email from session
        userId: session.user?.id, // Add user ID if available
      },
      items: cart.map((item) => ({
        product: item._id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        image: item.images[0],
      })),
      totalAmount: getCartTotal(),
    };

    try {
      const response = await axios.post("/api/placeOrder", orderData);
      if (response.status === 201) {
        clearCart();
        router.push(`/orderSuccess?id=${response.data.orderId}`);
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error.response?.data?.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  // Loading state during session check
  if (!mounted || status === "loading") {
    return (
      <div className="bg-bg-primary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-action"></div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect via useEffect)
  if (status === "unauthenticated") {
    return null;
  }

  // Empty Cart State
  if (cart.length === 0) {
    return (
      <div className="bg-bg-primary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold uppercase mb-4">Your Cart is Empty</h2>
          <Link 
            href="/shop" 
            className="text-white bg-action px-6 py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-action-hover transition-colors"
          >
            Go back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-bg-primary min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-10 text-sm font-bold uppercase tracking-widest text-text-primary/50">
          <Link href="/cart" className="hover:text-action transition-colors">
            Cart
          </Link>
          <span>/</span>
          <span className="text-action">Checkout</span>
        </div>

        {/* Main Grid: Form on Left, Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Checkout Form */}
          <div className="lg:col-span-7">             
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
              <CheckoutForm register={register} errors={errors} />
            </form>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-5">
            <OrderSummary 
              cart={cart} 
              total={getCartTotal()} 
              loading={loading} 
            />
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;