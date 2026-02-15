"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import {
  Loader2,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
} from "lucide-react"; // Cleanup imports
import Link from "next/link";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ReviewModal from "@/app/components/orders/ReviewModal";

const MyOrdersPage = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATE FOR MODAL (We store the full item + the orderId to find it later)
  const [reviewTarget, setReviewTarget] = useState(null);

  useEffect(() => {
    if (status === "authenticated") fetchMyOrders();
    else if (status === "unauthenticated") setLoading(false);
  }, [status]);

  const fetchMyOrders = async () => {
    try {
      const response = await axios.get("/api/getOrderInfoUser");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 🔥 THE MAGIC FUNCTION (Updates UI Instantly) ---
  const handleReviewSuccess = (productId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => ({
        ...order,
        items: order.items.map((item) => {
          // Check if this is the item we just reviewed
          // Use .product (ref ID) or ._id depending on your data structure
          const itemId = item.product?._id || item.product || item._id;

          if (itemId === productId) {
            return { ...item, isReviewed: true }; // Flip the switch!
          }
          return item;
        }),
      })),
    );
    setReviewTarget(null); // Close modal
  };

  const getStatusBadge = (status) => {
    // ... (Your existing badge logic) ...
    switch (status) {
      case "Pending":
        return {
          color: "bg-yellow-100 text-yellow-700 border-yellow-200",
          icon: <Clock className="w-3 h-3" />,
        };
      case "Processing":
        return {
          color: "bg-blue-100 text-blue-700 border-blue-200",
          icon: <Package className="w-3 h-3" />,
        };
      case "Shipped":
        return {
          color: "bg-purple-100 text-purple-700 border-purple-200",
          icon: <Truck className="w-3 h-3" />,
        };
      case "Delivered":
        return {
          color: "bg-green-100 text-green-700 border-green-200",
          icon: <CheckCircle className="w-3 h-3" />,
        };
      case "Cancelled":
        return {
          color: "bg-red-100 text-red-700 border-red-200",
          icon: <XCircle className="w-3 h-3" />,
        };
      default:
        return {
          color: "bg-gray-100 text-gray-700 border-gray-200",
          icon: <Package className="w-3 h-3" />,
        };
    }
  };

  if (status === "loading" || loading)
    return (
      <div className="bg-bg-primary min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-action" />
      </div>
    );
  if (!session)
    return (
      <div className="bg-bg-primary min-h-screen flex flex-col items-center justify-center">
        Login Required
      </div>
    );

  return (
    <div className="bg-bg-secondary min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-24">
        {/* PAGE HEADER */}
        <div className="mb-8 flex justify-around items-center">
          <h1 className="text-3xl font-black uppercase tracking-tight text-text-primary">
            My Orders
          </h1>
          {/* SIGN OUT BUTTON  */}
          <div className="bg-bg-secondary px-4 py-8">
            <button
              onClick={() => signOut({callbackUrl: "/login"})}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold">No orders yet</h2>
            <Link href="/shop">
              <button className="mt-4 px-8 py-3 bg-action text-white rounded-xl">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const badge = getStatusBadge(order.status);
              return (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 border-b border-gray-100 pb-4 mb-4">
                    <div>
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded text-xs font-bold">
                        {order._id}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${badge.color}`}
                    >
                      {badge.icon} {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center gap-4"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-text-primary text-sm sm:text-base truncate">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              Qty: {item.quantity}{" "}
                              {item.selectedSize &&
                                `| Size: ${item.selectedSize}`}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                          <p className="font-bold text-text-primary">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </p>

                          {/* --- REVIEW BUTTON LOGIC --- */}
                          {order.status === "Delivered" &&
                            (item.isReviewed ? (
                              <span className="text-green-600 font-bold text-xs flex items-center gap-1 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                                Reviewed
                              </span>
                            ) : (
                              <button
                                onClick={() => setReviewTarget(item)} // Pass the whole item
                                className="text-action font-bold text-xs bg-nexus-color/10 px-3 py-1.5 rounded-lg hover:bg-nexus-color/20 transition-colors"
                              >
                                Write Review
                              </button>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Footer */}
                  <div className="flex justify-between items-center pt-4 mt-6 border-t border-gray-100">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                      Total Amount
                    </p>
                    <p className="text-xl font-black text-action">
                      Rs. {order.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
      <Footer />

      {/* Pass the Success Function to the Modal */}
      <ReviewModal
        isOpen={!!reviewTarget}
        product={reviewTarget || {}}
        onClose={() => setReviewTarget(null)}
        onSuccess={handleReviewSuccess}
      />
    </div>
  );
};

export default MyOrdersPage;
