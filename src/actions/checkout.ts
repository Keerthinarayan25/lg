"use server";
import { getAuthUser } from "@/lib/authFunctions";
// import { CheckoutFormData } from "@/types/checkoutType";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function createOrder(prevState: { success: boolean; error?: string } | undefined, formData: FormData):
Promise<{success:boolean; error?:string}> {

  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      error: "Server error."
    };
  }

  try {
    const user = await getAuthUser();

    const data = Object.fromEntries(formData.entries());

    console.log("Checkout Data:", data);


    const payload = {
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      customerPhone: data.customerPhone,

      billingAddress: {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        country: data.country,
      },

      shippingAddress: data.sameAsBilling === "true"
        ? {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        }
        : {
          street: data.shippingStreet,
          city: data.shippingCity,
          state: data.shippingState,
          zipCode: data.shippingZipCode,
          country: data.shippingCountry,
        },

      fromCart: true,
      isAuthenticated: true,
    };

    console.log("Checkout Data Received:", payload);

    const response = await fetch(`${BACKEND_URL}/v1/order`, {
      method: "POST",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      next: {
        tags: ["cart"],
      },
    })
    const resData = await response.json();
    

    if (!response.ok) {
      console.error("Checkout failed:",resData)
      return { success: false, error: resData?.message || "Order failed"};
    }


    return {
      success: true,
    };
  } catch (error) {

    console.error("Checkout failed try again later", error)
    return{
      success: false,
    }

  }
}