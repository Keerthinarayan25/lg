"use client";

import Image from "next/image";
import { Truck, MapPin } from "lucide-react";
import { Product, Variant } from "@/types/productTypes";
import AddtoCartButton from "../cart/AddtoCartButton";



export default function ProductDetails({ product }: { product: Product }) {

  // console.log("Product variants:", product.variants);
  
  const variant: Variant | null =
  product.variants?.find((v) => v.isDefault) ??
  product.variants?.[0] ??
  null;
  console.log("PRoduct ID:", variant);

  const price = variant?.price ?? 0;
  const discount = variant?.discount ?? 0;

  const discountedPrice =
    price - (price * discount) / 100;

  return (
    <div className="bg-[#f5f3ef] p-6 md:p-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-300">

        {/* LEFT TITLE */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>
        </div>

        {/* RIGHT PRICE SECTION */}
        <div className="flex flex-col items-start md:items-end mt-4 md:mt-0 gap-2">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{discountedPrice}
            </span>

            {discount > 0 && (
              <span className="text-red-600 font-semibold text-sm">
                ₹{price - discountedPrice} OFF
              </span>
            )}
          </div>

          {price > 0 && (
            <span className="text-gray-500 text-sm line-through">
              ₹{price}
            </span>
          )}

          <AddtoCartButton 
            productId = {product.id}
            productVariant={variant!}/>
        </div>
      </div>

      {/* MAIN BODY */}
      <div className="flex flex-col md:flex-row">

        {/* LEFT IMAGE GALLERY */}
        <div className="md:w-1/2 sticky top-0 h-screen flex items-center justify-center border-r bg-gray-50">
          <ProductGallery images={product.image || []} />
        </div>

        {/* RIGHT INFO */}
        <div className="md:w-1/2 overflow-y-auto p-8 space-y-12">
          <ProductInfo description={product.description} />

          <Shipping variant={variant} />

          {/* SUMMARY */}
          <ProductSummary
            productId = {product.id}
            name={product.name}
            price={price}
            savings={price - discountedPrice}
            discountedPrice={discountedPrice}
            productVariant={variant!}
          />
        </div>
      </div>
    </div>
  );
}



function ProductInfo({ description }: { description?: string }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Description</h3>

      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}


function ProductGallery({ images }: { images: string[] }) {
  const safeImages = images.length > 0 ? images : ["/placeholder.png"];

  return (
    <div className="flex flex-col items-center space-y-4">
      {safeImages.map((src, i) => (
        <div key={i} className="w-[80%] border rounded-lg bg-white shadow-sm p-2">
          <Image
            src={src}
            alt={`Product image ${i + 1}`}
            width={500}
            height={500}
            className="object-contain w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}


function Shipping({ variant }: { variant: Variant | null }) {
  if (!variant) return null;

  return (
    <section className="rounded-xl border bg-[#f5f3ef] p-4 md:p-5">
      <div className="flex items-center gap-2 text-sm">
        <MapPin size={16} />
        <span>Ships Nationwide</span>
      </div>

      <div className="mt-2 flex items-center gap-2 text-gray-700 text-sm">
        <Truck size={16} />
        <span>Delivery Available</span>
      </div>
    </section>
  );
}



function ProductSummary({
  productId,
  name,
  price,
  savings,
  discountedPrice,
  productVariant,
}: {
  productId:string;
  name: string;
  price: number;
  savings: number;
  discountedPrice: number;
  productVariant: Variant;
}) {
  return (
    <div className="rounded-xl border p-6 space-y-5 bg-white">
      <h3 className="text-lg font-semibold text-gray-900">
        Review your selections
      </h3>

      <div className="flex justify-between text-gray-900 text-sm font-medium">
        <span className="max-w-[70%] leading-5">{name}</span>
        <span>₹{price}</span>
      </div>

      <div className="flex justify-between text-base font-semibold border-t pt-4">
        <span>Selection Total</span>
        <span>₹{discountedPrice}</span>
      </div>

      {savings > 0 && (
        <div className="text-red-600 space-y-2">
          <p className="font-semibold text-sm flex items-center gap-1">
            Total Savings (1)
            <span className="ml-auto">₹{savings}</span>
          </p>

          <div className="text-gray-700 text-xs font-bold">PRODUCT SAVINGS</div>

          <div className="flex justify-between text-sm font-medium text-gray-900">
            <span>Product Discount(s)</span>
            <span className="text-red-600">₹{savings}</span>
          </div>
        </div>
      )}

      <AddtoCartButton 
        productId = {productId}
        productVariant={productVariant}
        />
    </div>
  );
}
