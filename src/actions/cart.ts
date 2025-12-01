"use server";

import { getAuthUser } from "@/lib/authFunctions";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function addToCart(productId: string, quantity: number, variantId: string) {
  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      message: "Server error."
    };
  }
  console.log("Prodeuct variant is :", variantId);

  try {
    const user = await getAuthUser();
    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "POST",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity, variantId }),
      next: {
        tags: ["cart"],
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    return {
      success: true,
      message: "Item added to cart!"
    };

  } catch (error) {
    console.error("Error in adding to cart:", error);

  }

}

export async function getCartItems() {
  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      message: "Server error."
    };
  }

  try {
    const user = await getAuthUser();
    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "GET",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      next: {
        tags: ["cart"],
      },
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error in getting cart from server:", error);

  }

}

export async function removeCartItem(cartId:string) {

  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      message: "Server error."
    };
  }
  console.log("Cart Id is :", cartId);

  try {
    const user = await getAuthUser();
    const response = await fetch(`${BACKEND_URL}/v1/cart`, {
      method: "DELETE",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartId }),
      next: {
        tags: ["cart"],
      },
    });

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    return {
      success: true,
      ...data,
      message: "Item removed from cart!"
    };

  } catch (error) {
    console.error("Error in adding to cart:", error);

  }
}

export async function updateCartQuantity(cartId:string,newQty:number){

  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      message: "Server error."
    };
  }

  try {
    const user = await getAuthUser();
    const response = await fetch(`${BACKEND_URL}/v1/cart/update`, {
      method: "PATCH",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItemId:cartId, action:"set",quantity: newQty }),
      next: {
        tags: ["cart"],
      },
    });

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    return {
      success: true,
      ...data,
      message: "Item Updated"
    };

  } catch (error) {
    console.error("Error in adding to cart:", error);

  }

}