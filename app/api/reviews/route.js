import { NextResponse } from "next/server";
import connectDb from "@/lib/connectDb";
import Review from "@/models/Reviews";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDb();

    // We expect user ID, product ID, rating, and comment
    const { userId, productId, rating, comment ,userEmail } = await req.json();

    // 1. Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    // 3. Create the Review
    await Review.create({
      user: userId,
      product: productId,
      rating: Number(rating),
      comment,
    });

    // We find all reviews for this product to get the new average
    const reviews = await Review.find({ product: productId });

    // Calculate new stats
    const numReviews = reviews.length;
    // Reduce sums up all ratings. 0 is the starting value.
    const avgRating =
      reviews.reduce((acc, item) => item.rating + acc, 0) / numReviews;

    // 5. Update the Product with new stats
    product.numReviews = numReviews;
    product.averageRating = avgRating;

    await product.save();

    // 2. UPDATE THE ORDER ITEM
    // We search for an Order that belongs to this User AND contains this Product
    await Order.updateOne(
      {
        "customer.email": userEmail,
        "items.product": productId,
        status: "Delivered",
      },
      {
        $set: { "items.$.isReviewed": true },
      },
    );

    return NextResponse.json(
      { message: "Review added!", newRating: avgRating },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
