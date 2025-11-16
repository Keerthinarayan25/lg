"use server";
import { cookies } from "next/headers"

export async function getAuthUser() {
  const cookieStore = await cookies();

  const userData = cookieStore.get("userId");
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
  const token = cookieStore.get("token");

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