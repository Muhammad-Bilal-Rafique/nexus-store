import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Reviews from "@/models/Reviews";
import User from "@/models/users";

export async function GET(req, { params }) {
  try {
    await connectDb();

    // 1. Grab the ID from the URL (app/api/reviews/[id])
    const { id } = await params;

    // 2. Find Reviews for this specific product
    const reviews = await Reviews.find({ product: id }).populate("user" ,"name")
      .sort({ createdAt: -1 }); // Newest reviews at the top

    return NextResponse.json(reviews, { status: 200 });

  } catch (error) {
    console.error("Fetch Reviews Error:", error);
    return NextResponse.json(
      { message: "Failed to load reviews" },
      { status: 500 }
    );
  }
}