"use client";
import Link from "next/link";
import { Package, PlusCircle, ShoppingBag, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Manage Products", href: "/admin/ManageProducts", icon: Package, color: "bg-blue-500" },
    { title: "Add New Product", href: "/admin/Add", icon: PlusCircle, color: "bg-purple-500" },
    { title: "View Orders", href: "/admin/orders", icon: ShoppingBag, color: "bg-green-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-nexus-color text-white p-8 rounded-3xl shadow-lg shadow-nexus-color/20">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-2">Welcome Back, Boss 👋</h1>
        <p className="opacity-90">Here is what is happening at Nexus today.</p>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Link key={index} href={stat.href}>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer h-full flex flex-col items-center justify-center text-center gap-4">
              <div className={`w-16 h-16 rounded-2xl ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <stat.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{stat.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}