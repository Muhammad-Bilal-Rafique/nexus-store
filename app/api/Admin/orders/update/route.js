import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Order from "@/models/Order";

export async function PUT(req) {
  try {
    await connectDb();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    );

    return NextResponse.json(
      { message: "Status updated", order: updatedOrder },
      { status: 200 }
    );
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Error updating status" }, { status: 500 });
  }
}