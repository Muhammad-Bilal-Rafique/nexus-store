import dbConnect from "@/lib/connectDb";
import Product from "@/models/Product"; 
import Review from "@/models/Reviews";   
import ProductDetails from "./ProductDetails";

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  // console.log("This is id ",id);

  // 2. Connect to the database directly. No Axios. No API routes.
  await dbConnect();

  try {
    // Fetch the product AND reviews at the exact same time.
    const [fetchedProduct, fetchedReviews] = await Promise.all([
      Product.findById(id).lean(),
      Review.find({ productId: id }).lean()
    ]);
// console.log("Productsss",fetchedProduct);

    if (!fetchedProduct) {
      return (
        <div className="min-h-screen flex flex-col justify-center items-center text-center py-20">
          <h2 className="text-2xl font-black uppercase">Product Not Found</h2>
        </div>
      );
    }

    // 5. Serialize the MongoDB ObjectIDs to strings so they can cross the Server/Client boundary
    const product = { ...fetchedProduct, _id: fetchedProduct._id.toString() };
    const reviews = fetchedReviews.map(r => ({ ...r, _id: r._id.toString() }));
    
    // Optional: Calculate ratings here on the server instead of saving them in state!
    const numberOfReviews = reviews.length;
    const averageRating = numberOfReviews > 0 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / numberOfReviews 
      : 0;

    // 6. Pass the perfectly formatted data to the Client Component
    return (
      <ProductDetails 
        product={product} 
        reviews={reviews} 
        ratings={averageRating}
        numberOfReviews={numberOfReviews}
      />
    );

  } catch (error) {
    console.error("Failed to fetch product on server:", error);
    return <div className="text-center py-20 text-red-500">Something went wrong.</div>;
  }
}