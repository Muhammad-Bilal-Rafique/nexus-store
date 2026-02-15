import { NextResponse } from "next/server";
import dbConnect from "@/lib/connectDb";
import Product from "@/models/Product";

export async function GET(request) {
  try {
    await dbConnect();

    // 1. Get parameters from the URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = 2; // Items per page
    
    // Get Filters
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");
    const size = searchParams.get("size");
    // const rating = searchParams.get("rating");

    // 2. Build the Database Query Object
    const query = {};

    // Filter by Category
    if (category && category !== "All Products") {
      query.category = category;
    }

    // Filter by Size (Look inside the 'sizes' array)
    if (size) {
      query.sizes = { $in: [size] };
    }

    // Filter by Rating (Only if you added a 'rating' field to your Schema)
    // If you don't have ratings in DB yet, you can remove this block
  //  if (rating && parseInt(rating) > 0) {
      // query.rating = { $gte: parseInt(rating) }; 
    //}

    // 3. Handle Sorting
    let sortOption = { createdAt: -1 }; // Default: Newest first

    if (sort === "low-high") {
      sortOption = { price: 1 }; // Cheapest first
    } else if (sort === "high-low") {
      sortOption = { price: -1 }; // Expensive first
    } else if (sort === "best-sellers") {
      sortOption = { sold: -1 }; // If you have a 'sold' count
    }

    // 4. Pagination Math
    const skip = (page - 1) * limit;

    // 5. Fetch Data with the specific Query & Sort
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);
    
    // Check if there is a 'next page' available
    const totalFiltered = await Product.countDocuments(query);
    const hasMore = totalFiltered > (skip + products.length);

    return NextResponse.json({ products, hasMore }, { status: 200 });

  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ message: "Error fetching products" }, { status: 500 });
  }
}