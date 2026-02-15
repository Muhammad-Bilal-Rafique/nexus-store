import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDb";
import Product from "@/models/Product";

export async function GET() {
  try {
    await dbConnect();
    // Fetch top 8 newest items
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(8);
    
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching drops" }, { status: 500 });
  }
}