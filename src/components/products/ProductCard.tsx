"use client";
import Image from "next/image";
import { useState } from "react";
import { Star, ShoppingCart, Eye } from "lucide-react";

interface ProductProps {
  title: string;
  code: string;
  price: number;
  oldPrice: number;
  discount: string;
  image: string;
  rating: number;
  reviews: number;
  deliveryDate: string;
  pickupDate: string;
}

export default function ProductCard({
  title,
  code,
  price,
  oldPrice,
  discount,
  image,
  rating,
  reviews,
  deliveryDate,
  pickupDate,
}: ProductProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group ${
        hovered ? "h-[540px]" : "h-[350px]"
      }`}
    >
      {/* Product Image */}
      <div className="relative w-full h-[220px] flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50">
        <Image
          src={image}
          alt={title}
          width={220}
          height={220}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Floating Action Buttons */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
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
        <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-xs mt-1">{code}</p>

        <div className="mt-2">
          <span className="text-lg font-bold text-gray-900">${price}</span>
          <span className="text-gray-400 line-through ml-2 text-sm">${oldPrice}</span>
          <span className="text-green-600 ml-2 text-xs font-semibold">{discount}</span>
        </div>
      </div>

      {/* Hover Details */}
      <div
        className={`absolute left-0 right-0 bottom--10 p-4 text-sm text-gray-700 overflow-hidden transition-all duration-500 ${
          hovered ? "opacity-100 max-h-[220px]" : "opacity-0 max-h-0"
        }`}
      >
        {/* Rating */}
        <div className="flex justify-center mb-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="text-xs text-center mb-3">{reviews} Reviews</p>

        <div className="text-center space-y-1">
          <p>
            <span className="font-semibold">Delivery:</span> {deliveryDate}
          </p>
          <p>
            <span className="font-semibold">Pickup:</span> {pickupDate}
          </p>
        </div>

        {/* Hover Action Buttons */}
        <div className="mt-4 flex justify-center gap-3">
          <button className="px-4 py-2 text-sm font-medium bg-[#ea1917] text-white rounded-xl hover:bg-white hover:text-black hover:border-1  transition">
            Add to Cart
          </button>
          <button className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-xl hover:bg-gray-100 transition">
            View
          </button>
        </div>
      </div>
    </div>
  );
}
