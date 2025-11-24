"use server";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";


export async function getProducts(){
  try {

    const response = await fetch(`${BACKEND_URL}/v1/products`,{
      method: "GET",
      headers: {
        'x-api-key': API_KEY,
      },
      cache: "no-store",
      next: {
        tags: ["products"],
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    return response.json();

  } catch (error: unknown) {
    console.error("error fetching products:", error);
    return {
      success: false,
      errro: "Failed to fetch products",
    }
  }
}

export async function getProductsCategory(category:string) {
  try {

    const response = await fetch(`${BACKEND_URL}/v1/products/category/${category}`, {
      method: "GET",
      headers: {
        'x-api-key': API_KEY,
      },
      cache: "no-store",
      next: {
        tags: ["products"],
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      return {
        success: false,
        status: response.status,
        error: errorData.message || `Server error: ${response.status}`,
      };
    }

    return response.json();

  } catch (error: unknown) {
    console.error("error fetching products:", error);
    return {
      success: false,
      errro: "Failed to fetch products",
    }
  }
}