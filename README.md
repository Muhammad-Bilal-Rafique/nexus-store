# 🛒 NEXUS - Full-Stack E-commerce Platform

**Nexus** is a robust and scalable e-commerce application built with the latest web technologies. It features a seamless shopping experience for users and a powerful, secure dashboard for administrators to manage inventory, orders, and products.

![Project Preview](https://via.placeholder.com/1000x500?text=Nexus+Dashboard+Preview) 
*(Note: Replace the link above with a screenshot of your actual dashboard once deployed)*

## 🚀 Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS + Lucide React
* **Database:** MongoDB + Mongoose
* **Authentication:** NextAuth.js (Credentials + Google OAuth)
* **State Management:** React Hooks & Context API
* **Notifications:** Sonner / React Hot Toast
* **Deployment:** Vercel

## ✨ Key Features

### 👤 User Features
* **Secure Authentication:** Sign up/Login via Email or Google.
* **Product Discovery:** Advanced search, filtering, and categorization.
* **Shopping Experience:** Add to cart, manage quantities, and seamless checkout flow.
* **Order History:** View past orders and status updates (Processing, Shipped, Delivered).
* **Review System:** Users can only review products they have actually purchased (Verified Purchase logic).

### 🛡️ Admin Dashboard (RBAC)
* **Role-Based Access Control:** Secure middleware protects admin routes from unauthorized users.
* **Product Management:** Create, Read, Update, and Delete (CRUD) products with image support.
* **Inventory Control:** Real-time stock tracking with visual indicators (Low Stock/Out of Stock).
* **Order Management:** View customer orders and update shipping statuses.

## 🛠️ Getting Started

Follow these steps to run the project locally:

**1. Clone the repository**
```bash
git clone [https://github.com/YOUR_USERNAME/nexus-store.git](https://github.com/YOUR_USERNAME/nexus-store.git)
cd nexus-store