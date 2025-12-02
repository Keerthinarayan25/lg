import { getAuthUser } from "@/lib/authFunctions";
import { CheckoutFormData } from "@/types/checkoutType";

const API_KEY = process.env.BACKEND_API_KEY || "";
const  BACKEND_URL = process.env.BACKEND_URL || "";

export async function createOrder(prevState: { success: boolean; error?: string } | undefined,formData: CheckoutFormData) {
  console.log("Checkout Data Received:", formData);

  if (!API_KEY || !BACKEND_URL) {
    console.log("NO Environment variables in cart.ts: BACKEND_API_KEY or BACKEND_URL");
    return {
      success: false,
      message: "Server error."
    };
  }

  try {
    const user = await getAuthUser();

    
    const response = await fetch(`${BACKEND_URL}/v1/order`,{
      method:"POST",
      headers: {
        'x-api-key': API_KEY,
        "x-customer-id": user.id,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData }),
      next: {
        tags: ["cart"],
      },
    })
    

    return {
      success: true,
      message: "Checkout completed successfully",
    };
  } catch (error) {

    console.log("Checkout failed try again later", error)

  }
}