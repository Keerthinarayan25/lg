"use client";
import { removeCartItem } from "@/actions/cart";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface RemoveFromCartProps {
  cartId: string;
}

export default  function RemoveFromCart({cartId}: RemoveFromCartProps) {
  const router = useRouter();

  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const result= await removeCartItem(cartId);
      console.log("Item removed from cart");
      if (result?.success) {
        router.refresh();
      } else {
        console.error("Failed to remove item:", result);
      }
    } catch (error) {
      console.log("Failed to remove:", error);

    }finally{
      setIsRemoving(false);
    }

  }

  return (
    <button 
      className="text-gray-600 hover:underline" 
      onClick={handleRemove}
      disabled={isRemoving}
    >
      {isRemoving ? "Removing..." : "Remove"}</button>

  );
}