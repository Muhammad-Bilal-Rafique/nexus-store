import Review from "@/models/Reviews";
import connectDb from "@/lib/connectDb";
import Reviews from "@/app/components/product/Reviews"; 
import Footer from "@/app/components/layout/Footer";

export default async function ReviewsSection({ productId }) {
  await connectDb();

  const fetchedReviews = await Review.find({ productId }).lean();

  const reviews = fetchedReviews.map(r => ({
    ...r,
    _id: r._id.toString(),
  }));

  return <>
  <Reviews reviews={reviews} />
  <Footer/>
  </>;
}