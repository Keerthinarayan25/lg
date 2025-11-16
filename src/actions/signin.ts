"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";

export async function signin(prevState:{ success: boolean; error?: string },formData:FormData): 
Promise<{success:boolean; error?:string}> {

  const email = formData.get("email");
  const password = formData.get("password") as string;

  if(! email || !password){
    return{
      success:false,
      error:"All fields are required",
    };
  }
  
  if(password.length  < 6){
    return {
      success: false,
      error: "Password must be at least 6 characters long",
    };
  }

  if (!API_KEY || !BACKEND_URL) {
    console.error(
      "BACKEND_API_KEY or BACKEND_URL is not set"
    );
    return {
      success: false,
      error: "Error in API Call",
    };
  }
  
  try {
    const response = await fetch(`${BACKEND_URL}/v1/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error:
          errorData.message ||
          `Server error: ${response.status}. Please try again.`,
      };
    }

    const data = await response.json();

    // console.log("SIGNUP RESPONSE STATUS:", response.status);
    // console.log("SIGNUP RESPONSE BODY:", data);

    // console.log("ERROR DETAILS:", JSON.stringify(data, null, 2));

    // console.log("ISSUES:", data.errors?.issues);

    const cookieStore = await  cookies();
    cookieStore.set("token", data.token,{
      httpOnly: true,
      secure:true,
      sameSite: "lax",
      path:"/",
      maxAge: 60*60*24*90,
    });

    cookieStore.set("userId", JSON.stringify(data.user),{
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path:"/",
      maxAge: 60*60*24*90,
    });

    return{
      success:true,
    }



  }catch(error){
    console.error("Signup Error", error);
    return{
      success: false,
      
    };

  }
}

export async function redirectToSignup() {
  redirect("/signup");
}

export async function redireactToLandingPage() {
  redirect("/");
}

