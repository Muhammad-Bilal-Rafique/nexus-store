
import ProductCard from "../shop/ProductCard";
import Link from "next/link";
import Product from "@/models/Product";
import connectDb from "@/lib/connectDb";


export default async function FeaturedSection() {
   let products = []
   try {
    // CONNECT THE DB
    await connectDb();
    //GET THE PRODUCTS FROM MODEL
    const fetchedProducts = await Product.find({}).sort({createdAt:-1}).limit(8).lean();
    console.log(fetchedProducts,"The products");
    
      products = fetchedProducts.map(product => ({
      ...product,
      _id : product._id.toString()

    }))
   } catch (error) {
    console.error("Failed to fetch new drops from DB:", error);
    return <div className="py-24 text-center text-red-500">Failed to load new drops.</div>;
   }

  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">New Drops</h2>
        <Link href="/shop" className="hidden md:block text-sm font-bold underline underline-offset-4">View All</Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </section>
  );
}