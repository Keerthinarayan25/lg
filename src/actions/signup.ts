"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const API_KEY = process.env.BACKEND_API_KEY || "";
const BACKEND_URL = process.env.BACKEND_URL || "";


export async function signup(prevState:{ success: boolean; error?: string },formData:FormData): 
Promise<{success:boolean; error?:string}> {

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password") as string;

  if(!name || ! email || !password){
    return{
      success:false,
      error:"All fields are required",
    };
  }
  
  if(password.length  < 8){
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
    const response = await fetch(`${BACKEND_URL}/v1/signup`,{
      method:"POST",
      headers: {
        "Content-Type":"application/json",
        "x-api-key":API_KEY,
      },
      body: JSON.stringify({name, email,password}),
    });

    const data = await response.json();

    // console.log("SIGNUP RESPONSE STATUS:", response.status);
    // console.log("SIGNUP RESPONSE BODY:", data);

    // console.log("ERROR DETAILS:", JSON.stringify(data, null, 2));

    // console.log("ISSUES:", data.errors?.issues);

    
    if (!response.ok) {
      if (response.status === 409 || data?.message?.includes("exists")) {
        // backend may return 409 Conflict or message like “User already exists”
        return {
          success: false,
          error: "User already registered. Please log in instead.",
        };
      }

      console.error("Backend signup error:", data);
      return {
        success: false,
        error: data?.message || "Signup failed. Please try again.",
      };
    }

    
    const cookieStore = await  cookies();

    const guest = cookieStore.get("token");
    if(guest){
      try{
        const response = await fetch(`${BACKEND_URL}/v1/auth/merge-guest-data`,
          {
            method: "POST",
            headers: {
              "x-api-key": API_KEY,
              "x-customer-id": data.userId,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ guest }),
          }
        );
        if(response.ok){
          const Data = await response.json();
          console.log("Guest data :", Data);
        }else{
          console.error("Falied to get guest data",
            await response.text()
          );
          
        }
      } catch(error){
        console.error("Falied to merge guest data:",error);
      }
    }
    
    return {
      success:true
    }

    
  } catch (error:unknown) {
    console.error("Signup Error", error);
    return{
      success: false,
      
    };
    
  }

}

export async function redirectToLogin(){
  redirect("/signin");
}