"use client";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const [qty, setQty] = useState(1);

  const product = {
    name: "77 Inch Class LG OLED evo AI G5 4K Smart TV 2025 with Supplied Wall Mount",
    code: "OLED77G5WUA.AUS",
    image: "/TVs/image.png",
    price: 3799.99,
    oldPrice: 4499.99,
    discount: "$700 OFF",
  };

  return (
    <div className="bg-[#eae6db] min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">My Cart (1)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CARD — PRODUCT */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-5 space-y-6">

          {/* Product Info */}
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.name}
              className="rounded-lg bg-gray-50 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.code}</p>

              {/* Delivery / Pickup */}
              <div className="mt-3 flex gap-6 items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" defaultChecked />
                  <span className="text-sm text-gray-700">
                    Est. Delivery to <strong>90210</strong>: Mon, Oct 27
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" />
                  <span className="text-sm text-gray-700">
                    Pickup — <Link href="#" className="text-blue-600 underline">
                      Select store
                    </Link>
                  </span>
                </label>
              </div>

              {/* Save / Remove */}
              <div className="mt-3 flex gap-4 text-sm">
                <button className="text-gray-600 hover:underline">Save for later</button>
                <button className="text-gray-600 hover:underline">Remove</button>
              </div>
            </div>

            {/* Quantity + Price */}
            <div className="flex flex-col items-end gap-2">
              <div className="flex border rounded-full items-center">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="p-2"
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 font-semibold">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="p-2"
                >
                  <Plus size={18} />
                </button>
              </div>

              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>

              <p className="text-red-600 text-sm font-semibold">
                {product.discount}
              </p>
              <p className="line-through text-gray-400 text-xs">
                ${product.oldPrice.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Add-ons */}
          <div className="text-sm border-t pt-4">
            <p className="font-semibold">LG Premium Care by Asurion</p>
            <p className="text-gray-600 mt-1">
              Stay covered longer with expert support and protection you can trust.
            </p>
            <button className="mt-3 px-4 py-2 rounded-full border hover:bg-gray-50">
              Explore Protection Plans
            </button>
          </div>

          <div className="text-sm">
            <p className="font-semibold">TV stand setup or Wall mounting</p>
            <p className="text-gray-600 mt-1">
              Professional installation for a perfect setup—stand or wall.
            </p>
            <button className="mt-3 px-4 py-2 rounded-full border hover:bg-gray-50">
              View Services
            </button>
          </div>
        </div>

        {/* RIGHT CARD — ORDER SUMMARY */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="text-sm bg-gray-100 p-4 rounded-md">
            Upgrade to <span className="text-blue-600 font-semibold underline cursor-pointer">
              MyLG Ownership Program
            </span>{" "}
            to earn 5% back.
          </div>

          {/* Promo Code */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              className="border p-3 rounded-lg flex-1"
            />
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Apply
            </button>
          </div>

          {/* Totals */}
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong>${product.price.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated at Checkout</span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Tax</span>
              <span>Calculated at Checkout</span>
            </div>

            <div className="border-t pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Buttons */}
          <button className="w-full bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition">
            Checkout
          </button>

          <button className="w-full py-3 rounded-full border font-semibold hover:bg-gray-100">
            Express Checkout
          </button>

          {/* Apple Pay / Google Pay */}
          <div className="flex justify-center gap-4 text-lg">
            <span>Apple Pay</span>
            <span>G Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
}
  