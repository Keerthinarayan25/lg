"use client";
import { CartItem } from "@/types/cartTypes";
import Image from "next/image";
import Link from "next/link";
import RemoveFromCart from "./RemoveFromCart";
import { Minus, Plus } from "lucide-react";
import { updateCartQuantity } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartItemCard({ item }: { item: CartItem }) {
  const router = useRouter();

  const product = item.product;
  const variant = item.variant;
  const image = product.image?.[0] || "/laptop/image.png";
  const cartId = item.id;

  console.log("Cart ID is :", cartId);

  const [isRemoving, setIsRemoving] = useState(false);
  const updateQuantity = async (newQty:number) =>{
    setIsRemoving(true);
    try {
          const result= await updateCartQuantity(cartId,newQty);
          console.log("Item Updated");
          if (result?.success) {
            router.refresh();
          } else {
            console.error("Failed to Update item:", result);
          }
        } catch (error) {
          console.log("Failed to update:", error);
    
        }finally{
          setIsRemoving(false);
        }

  }


  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={image}
        width={200}
        height={200}
        alt={product.name}
        className="rounded-lg bg-gray-50 object-contain"
      />

      <div className="flex-1">
        <Link key={product.id}
          href={`/${product.category}/${product.id}`} className="hover:underline">
        <h2 className="font-semibold text-lg">{product.name}</h2>
        </Link>
        <p className="text-gray-500 text-sm">{variant.displayName}</p>

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
          <RemoveFromCart cartId={cartId} />
        </div>
        <div className="flex items-center border rounded-full px-3 py-1 w-30 gap-4">
          <button disabled={isRemoving || item.quantity <= 1}
            onClick={()=>updateQuantity(item.quantity - 1)}
            className="text-gray-500 hover:text-black"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button disabled={isRemoving}
            onClick={()=>updateQuantity(item.quantity + 1)}
            className="text-gray-500 hover:text-black"
          >
            <Plus size={16}/>
          </button>
          
        </div>
      </div>

      {/* Quantity + Price */}
      <div className="flex flex-col items-end gap-2">
        <p className="text-2xl font-bold">₹{variant.finalPrice}</p>
        <div className="flex border rounded-full items-center space-x-2.5">

          <p className="text-red-600 text-sm font-semibold">
            {variant.discount} % OFF
          </p>
          <p className="line-through text-gray-400 text-xs">
            ₹{variant.price}
          </p>
        </div>
      </div>
    </div>

  );
}
