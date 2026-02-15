import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDb";
import Product from "@/models/Product"; 


export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);

    

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching product", details: error.message }, { status: 500 });
  }
}
