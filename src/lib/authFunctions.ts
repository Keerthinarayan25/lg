"use server";
import { cookies } from "next/headers"

const AUTH_TOKEN_KEY = "token";
const USER_DATA_KEY = "userId";
const GUEST_TOKEN_KEY = "guest_token";
export async function getAuthUser() {
  const cookieStore = await cookies();

  const userData = cookieStore.get(USER_DATA_KEY);
  if (!userData?.value) {
    return null;
  }

  try {
    const decodedValue = decodeURIComponent(userData.value);
    return JSON.parse(decodedValue);
  } catch (error) {
    console.error("Error parsing user data from cookie:", error);
    return null;
  }

}
export async function getAuthToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_TOKEN_KEY);

  if (!token?.value) {
    return null;
  }
  return token?.value;

}

export async function isAuthenticated() {
  const token = await getAuthToken();
  const user = await getAuthUser();

  return !!(token && user);
}

export async function clearAuthCookies(){
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("userId");

}

export async function setGuestToken(token:string){
  const cookieStore = await cookies();
  cookieStore.set(GUEST_TOKEN_KEY,token, {
    httpOnly: true,
    secure:true,
    sameSite: "lax",
    path:"/",
    maxAge: 60*60*24*90,
  });
}

export async function getGuestToken(){
  const cookieStore = await cookies();
  const token = cookieStore.get(GUEST_TOKEN_KEY);
  return token?.value|| null;
}

export async function clearGuestToken(){
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_TOKEN_KEY);
}

export async function buildHeaders(){
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "x-api-key": process.env.BACKEND_API_KEY || "",
  };

  const user = await getAuthUser();
  if(user?.id){
    headers["x-customer-id"] = String(user.id);
  }else{
    const guestToken = await getGuestToken();
    if(guestToken){
      headers["x-guest-token"] = String(guestToken);
    }
  }
  return headers;
}

export async function handleApiResponse(response:Response){
  const newGuestToken = response.headers.get("x-geust-token");
  if(newGuestToken){
    await setGuestToken(newGuestToken);
  }
}