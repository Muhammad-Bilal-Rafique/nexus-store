import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Order from "@/models/Order";
import Product from "@/models/Product"; // ADD THIS

export async function POST(req) {
  try {
    await connectDb();

    const { customer, items, totalAmount } = await req.json();

    // 1. Enhanced Validation
    if (!customer || !items || items.length === 0 || !totalAmount) {
      return NextResponse.json({ message: "Missing required data" }, { status: 400 });
    }

    // 2. Validate Stock BEFORE updating
    for (const item of items) {
      const product = await Product.findById(item.product);
      
      if (!product) {
        return NextResponse.json(
          { message: `Product ${item.product} not found` },
          { status: 404 }
        );
      }
      
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { message: `Insufficient stock for ${product.title}` },
          { status: 400 }
        );
      }
    }

    // 3. Update Stock
    for (const item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    // 4. Create the Order
    const newOrder = new Order({
      customer,
      items,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order placed successfully", orderId: newOrder._id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json(
      { message: "Failed to place order", error: error.message },
      { status: 500 }
    );
  }
}