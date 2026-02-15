"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  LogOut, 
  ShoppingBag
} from "lucide-react";

export default function AdminNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Products", href: "/admin/ManageProducts", icon: Package },
    { name: "Add Product", href: "/admin/Add", icon: PlusCircle },
    { name: "Orders", href: "/admin/orders", icon: ShoppingBag }, 
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand */}
        <Link href="/admin">
          <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 bg-nexus-color rounded-lg flex items-center justify-center text-white font-black text-xl">N</div>
              <span className="font-bold text-gray-800 tracking-tight text-lg">Nexus <span className="text-nexus-color">Admin</span></span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <span className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-nexus-color text-white shadow-md shadow-nexus-color/20" 
                    : "text-gray-500 hover:text-nexus-color hover:bg-gray-50"
                }`}>
                  <link.icon size={18} />
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <button 
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-2 text-sm font-bold text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </nav>
  );
}