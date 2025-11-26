import ProductDetails from "@/components/products/productDetails";
import Link from "next/link";
import { getProductById } from "@/actions/product";

export default async function ProductDetailsPage({
  params,
}: {
  params: {  slug: string,productId: string };
}) {
  const { slug, productId } = await params;

  const product = await getProductById(productId);
  console.log("SLUG:",slug);

  if (!product)
    return <div className="p-8 text-red-600 text-center">Product not found.</div>;

  return (
    <div className="bg-[#f0ece4] min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-[#f5f3ef] py-3 px-8 border-b border-[#d8d5cf] sticky top-0 z-20">
        <nav className="flex items-center space-x-1 text-sm text-gray-700">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href={`/${slug}`} className="hover:underline capitalize">{product.data.category}</Link>
          <span className="text-gray-500">/</span>
          <span className="font-semibold text-gray-900">{product.data.name}</span>
        </nav>
      </div>

      <ProductDetails product={product.data} />
    </div>
  );
}
