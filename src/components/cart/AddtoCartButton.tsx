"use client";

import { addToCart } from "@/actions/cart";
import { useState } from "react";
import LoadCart from "./loading";
import { Variant } from "@/types/productTypes";
import { useRouter } from "next/navigation";
interface AddToCartButtonProps {
  productId: string;
  quantity?: number;
  productVariant: Variant;
}

export default function AddtoCartButton({
  productId,
  quantity = 1,
  productVariant,
}: AddToCartButtonProps) {

  const [isPending, setIsPending] = useState(false);
  const router = useRouter();


  const handleCartAction = async () => {
    try {
      setIsPending(true);

      const result = await addToCart(productId, quantity,productVariant.id);

      // Optional: You can toast messages here
      console.log("Added to cart:", result);
      router.push("/cart");


    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setIsPending(false);
    }

  }



  return (
    <>
      <LoadCart visible={isPending} />
      <button className=" w-full px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition mt-3"
        onClick={handleCartAction}
        disabled={isPending}>{isPending ? "Adding..." : "Add to Cart"}</button>
    </>
  )
}