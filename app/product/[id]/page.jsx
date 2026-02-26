import connectDb from "@/lib/connectDb";
import Product from "@/models/Product";
import ProductDetails from "./ProductDetails";
import { Suspense } from "react";
import ReviewsLoader from "@/app/components/product/ReviewsLoader";
import ReviewsSection from "./ReviewSection";

export const revalidate = 60;

export default async function ProductPage({ params }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
 
  await connectDb();

  const fetchedProduct = await Product.findById(id).lean();

  if (!fetchedProduct) {
    return <div>Product Not Found</div>;
  }

  const product = {
    ...fetchedProduct,
    _id: fetchedProduct._id.toString(),
  };

  return (
    <>
      <ProductDetails product={product} />

      {/* Reviews stream separately */}
      <Suspense fallback={<ReviewsLoader />}>
        <ReviewsSection productId={id} />
      </Suspense>
    </>
  );
}