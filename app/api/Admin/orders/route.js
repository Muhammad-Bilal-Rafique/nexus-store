import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Order from "@/models/Order";

export async function GET(req) {
  try {
    await connectDb();

    // Fetch all orders, sort by newest first (-1)
    const orders = await Order.find().sort({ createdAt: -1 });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}