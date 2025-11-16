"use server";
import { clearAuthCookies } from "@/lib/authFunctions";
import { redirect } from "next/navigation";


export default async function logOut(){
  try{
    await clearAuthCookies();
  }catch(error){
    console.error("Falied to clear cookies:", error);

  }

  redirect("/");
  
}