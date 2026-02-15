import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"; 
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Make sure this path points to your NextAuth options
import connectDb from "@/lib/connectDb";
import Order from "@/models/Order";

export async function GET() {
  try {
    await connectDb();
    
    // 1. Get Logged In User Session
    const session = await getServerSession(authOptions);
    
    // 2. If not logged in, return 401 Unauthorized
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 3. Find orders where the customer email matches the logged-in user's email
    // .sort({ createdAt: -1 }) means "Newest orders first"
    const myOrders = await Order.find({ 
      "customer.email": session.user.email 
    }).sort({ createdAt: -1 }); 

    return NextResponse.json(myOrders, { status: 200 });

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    return NextResponse.json({ message: "Failed to fetch orders" }, { status: 500 });
  }
}