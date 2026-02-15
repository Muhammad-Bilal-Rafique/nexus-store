import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Connects to your User model
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Connects to the Product being reviewed
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5, // 5 Star System
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500, // Keep it short and sweet
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model("Review", reviewSchema);