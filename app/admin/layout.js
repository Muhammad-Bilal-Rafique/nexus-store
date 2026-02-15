"use client";
import AdminNavbar from "./components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
       {/* 1. The Admin Navbar */}
       <AdminNavbar /> 
       
       {/* 2. The Page Content */}
       <main className="flex-1 max-w-7xl mx-auto w-full p-6 md:p-8">
         {children}
       </main>
    </div>
  );
}