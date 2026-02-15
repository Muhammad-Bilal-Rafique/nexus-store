import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    sizes: {
      type: [String],
    },
    colors: {
      type: [String],
    },
    stock: {
      type: Number,
      default: 0,
    },
    averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
     set: (val) => Number(val.toFixed(1)),
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  },
  { timestamps: true } 
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);