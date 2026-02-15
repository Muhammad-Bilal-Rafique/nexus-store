import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDb";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    // 1. Connect to the Database
    await dbConnect();

    // 2. Get the data sent from the Admin Panel(FROENTEND)
    const body = await req.json();

    // 3. Create a new Product in MongoDB
    const newProduct = await Product.create(body);

    // 4. Send back a success message
    return NextResponse.json(
      { message: "Product created successfully", product: newProduct },
      { status: 201 }
    );

  } catch (error) {
    console.log("Error creating product:", error);
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}