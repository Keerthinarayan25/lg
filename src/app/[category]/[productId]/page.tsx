import ProductDetails from "@/components/products/productDetails";
import Link from "next/link";
import { getProductById } from "@/actions/product";

export default async function ProductDetailsPage({
  params,
}: {
  params: {  category: string,productId: string };
}) {
  const { category, productId } = await params;

  const items = await getProductById(productId);
  const product = items.data;
  console.log("SLUG:",category);
  console.log("Data in details page:", items);

  if (!items)
    return <div className="p-8 text-red-600 text-center">Product not found.</div>;

  return (
    <div className="bg-[#f0ece4] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#f5f3ef] py-3 px-8 border-b border-[#d8d5cf] sticky top-0 z-20">
        <nav className="flex items-center space-x-1 text-sm text-gray-700">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href={`/${category}`} className="hover:underline capitalize">{category}</Link>
          <span className="text-gray-500">/</span>
          <span className="font-semibold text-gray-900">{product.name}</span>
        </nav>
      </div>

      <ProductDetails product={product} />
    </div>
  );
}
