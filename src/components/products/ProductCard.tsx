"use client";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types/productTypes";
// import AddtoCartButton from "../cart/AddtoCartButton";
import Link from "next/link";

export default function ProductCard(product: Product) {
  const [hovered, setHovered] = useState(false);

  console.log("In product card page:", product);
  
  const variant = product.variants?.find(v => v.isDefault) || product.variants?.[0] || { price: 0, discount: 0 };
  
  console.log("Variants are :", variant);
  const price = variant?.price ?? 0;
  const discount = variant?.discount ?? 0;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative bg-white rounded-2xl shadow-md 
        overflow-hidden transition-all duration-500 
        hover:shadow-2xl hover:-translate-y-2 group
        w-full ${hovered ? "h-[480px]" : "h-[390px]"}
      `}
    >
      {/* Product Image */}
      <div className="relative w-full flex justify-center p-3 bg-gray-50">
        <Image
          src={"/TVs/image.png"} // product.images[0]
          alt={product.name}
          width={300}
          height={200}
          className="object-contain w-full max-h-[200px] md:max-h-[230px] transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Buttons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 
          ${hovered ? "opacity-100" : "opacity-0"}`}
        >
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
            <Eye size={18} />
          </button>
          <button className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 text-base md:text-lg line-clamp-2">
          <Link
            key={product.id}
            href={`/${product.category}/${product.id}`}
            className="block"
          >
            {product.name}
          </Link>
        </h3>

        <div className="my-2">
          <span className="text-[20px] md:text-[22px] font-bold text-gray-900">
            ₹{discountedPrice.toFixed(2)}
          </span>

          <span className="text-red-500 text-xs md:text-sm ml-2 font-semibold">
            {discount}% OFF
          </span>

          <div>
            <span className="text-gray-400 line-through text-sm">
              ₹{price}
            </span>
          </div>
        </div>
      </div>

      {/* Hover Card Footer */}
      <div
        className={`
        absolute left-0 right-0 bottom-0 p-4 
        bg-white transition-all duration-500 overflow-hidden
        ${hovered ? "opacity-100 max-h-40" : "opacity-0 max-h-0"}
      `}
      >
        <div className="flex justify-center gap-3">
          {/* <AddtoCartButton
            productId={product.id}
          // productName = {product.name}
            productVariant = {variant}
          /> */}
        </div>
      </div>
    </div>
  );
}
