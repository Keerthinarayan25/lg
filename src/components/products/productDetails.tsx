"use client";

import Image from "next/image";
import { Star, Truck, MapPin } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types/product";

// local types for variants
type Variant = {
  size: number; // inches
  price: number;
  oldPrice?: number;
  discount?: string;
  availabilityByZip?: Record<string, boolean>;
};

type ProductWithVariants = Product & {
  variants?: Variant[];
  specifications?: Record<string, { label: string; value: string }[]>;
};


type ProductDetailsProps = {
  product: ProductWithVariants;
};

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="flex flex-col bg- min-h-screen">
      {/* PRODUCT HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-b bg-[#f7f4ed]">
        {/* LEFT SECTION: TITLE + INFO */}
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {product.name}
          </h1>
          <p className="text-gray-500 text-sm">{product.code}</p>

          <div className="flex items-center gap-2 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < (product.rating || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="text-sm text-gray-700">
              {product.rating?.toFixed(1)} ({product.reviews})
            </span>
            <a
              href="#reviews"
              className="text-blue-600 text-sm hover:underline ml-1"
            >
              Write a review
            </a>
          </div>
        </div>

        {/* RIGHT SECTION: PRICE + ACTIONS */}
        <div className="flex flex-col md:items-end gap-2 mt-4 md:mt-0">
          <div className="flex items-center space-x-3">
            <span className="text-3xl md:text-4xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.discount && (
              <span className="text-red-600 text-sm font-semibold">
                {product.discount}
              </span>
            )}
          </div>
          {product.oldPrice && (
            <span className="text-gray-400 line-through text-sm">
              ${product.oldPrice}
            </span>
          )}
          <div className="flex gap-3 mt-2">
            <button className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
              Special Offers
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCT BODY */}
      <div className="flex flex-col md:flex-row">
        {/* LEFT: Image Gallery */}
        <div className="md:w-1/2 sticky top-0 h-screen flex items-center justify-center border-r bg-gray-50">
          <ProductGallery images={product.images || []} />
        </div>

        {/* RIGHT: Product Details (Only Info + Shipping) */}
        <div className="md:w-1/2 overflow-y-auto p-8 space-y-12">
          <ProductInfo product={product} />

          {product.variants && product.variants.length > 0 && (
            <ShippingAndSizes variants={product.variants} />
          )}
          {/* REVIEW YOUR SELECTIONS */}
          <ProductSummary
            name={product.name}
            price={product.price}
            savings={product.oldPrice ? product.oldPrice - product.price : 0}
          />

        </div>
      </div> {/* End two-column layout */}

      {/* ✅ NEW FULL-WIDTH SPECIFICATION SECTION */}
      {product.specifications && (
        <div className="w-full px-6 md:px-12 mt-16">
          <ProductSpecifications specs={product.specifications} />
        </div>
      )}

    </div>

  );
}


function ShippingAndSizes({ variants }: { variants: Variant[] }) {
  const [zip, setZip] = useState("90210");
  const [selected, setSelected] = useState<number>(variants?.[1]?.size ?? variants?.[0]?.size);
  const selectedVariant = variants.find((v) => v.size === selected);
  const inStock = selectedVariant?.availabilityByZip?.[zip] ?? false;

  return (
    <section className="rounded-xl border bg-[#f5f3ef] p-4 md:p-5">
      <div className="flex items-center gap-2 text-sm">
        <MapPin size={16} className="text-gray-700" />
        <span className="text-gray-800">Shipping to</span>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          inputMode="numeric"
          maxLength={10}
          className="ml-2 w-24 rounded-md border border-gray-300 bg-white px-2 py-1 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
          aria-label="ZIP code"
        />
      </div>

      <div className="mt-2 flex items-center gap-2 text-gray-700 text-sm">
        <Truck size={16} />
        <span>Delivery</span>
      </div>

      {!inStock && (
        <p className="mt-1 text-sm text-gray-700">
          This item is temporarily out of stock for your ZIP Code
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-3">
        {variants.map((v) => (
          <button
            key={v.size}
            onClick={() => setSelected(v.size)}
            className={`rounded-lg border p-4 text-left bg-white hover:shadow-sm transition
              ${selected === v.size ? "ring-2 ring-gray-900" : ""}`}
            aria-pressed={selected === v.size}
            aria-label={`${v.size} inch`}
          >
            <div className="text-lg text-gray-900">{v.size}</div>
            <div className="mt-1 font-semibold text-gray-900">{usd.format(v.price)}</div>
            {v.discount && <div className="text-sm text-red-600 mt-0.5">{v.discount}</div>}
            {v.oldPrice && (
              <div className="text-sm text-gray-400 line-through">{usd.format(v.oldPrice)}</div>
            )}
          </button>
        ))}
      </div>
    </section>
  );
}


function ProductGallery({ images }: { images: string[] }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {images.map((src, i) => (
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

function ProductInfo({ product }: { product: Product }) {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-3">Key Features</h3>
      <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
        {product.features?.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>

      <p className="text-gray-700 leading-relaxed">{product.description}</p>

      <div className="mt-6 space-y-2">
        <p>
          <span className="font-semibold">Delivery:</span>{" "}
          {product.deliveryDate}
        </p>
        <p>
          <span className="font-semibold">Pickup:</span>{" "}
          {product.pickupDate}
        </p>
      </div>
    </div>
  );
}


function ProductSpecifications({ specs }: { specs: Record<string, { label: string, value: string }[]> }) {
  if (!specs) return null;

  return (
    <div id="specifications">
      <h3 className="text-xl font-semibold mb-4">Specifications</h3>

      <div className="space-y-6">
        {Object.entries(specs).map(([section, items], index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm bg-white">

            {/* Section Title */}
            <div className="bg-gray-100 p-3 font-semibold text-gray-900">
              {section}
            </div>

            {/* Table Content */}
            <table className="w-full text-sm text-left">
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b last:border-none">
                    <td className="px-4 py-2 text-gray-600 w-1/2">{item.label}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        ))}
      </div>
    </div>
  );
}


function ProductSummary({
  name,
  price,
  savings,
}: {
  name: string;
  price: number;
  savings: number;
}) {
  return (
    <div className="rounded-xl border p-6 space-y-4">
      {/* Review Title */}
      <h3 className="text-lg font-semibold text-gray-900">
        Review your selections
      </h3>

      {/* Product Row */}
      <div className="flex justify-between text-gray-900 text-sm font-medium">
        <span className="max-w-[70%]">{name}</span>
        <span>{usd.format(price)}</span>
      </div>

      {/* Total */}
      <div className="flex justify-between text-base font-semibold border-t pt-4">
        <span>Selection Total</span>
        <span>{usd.format(price)}</span>
      </div>

      {/* Savings */}
      {savings > 0 && (
        <div className="text-red-600 text-sm space-y-2">
          <p className="font-semibold">
            Total Savings (1){" "}
            <span className="text-base font-normal">^</span>
          </p>
          <div className="text-xs text-gray-700 font-bold">
            PRODUCT SAVINGS
          </div>

          <div className="flex justify-between font-medium">
            <span className="text-gray-900">Product Discount(s)</span>
            <span className="text-red-600">{usd.format(savings)}</span>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <button className="w-full bg-red-600 text-white rounded-full py-3 font-semibold text-lg hover:bg-red-700 transition">
        Add to Cart
      </button>
    </div>
  );
}
