import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function normalizeCategory(cat: string) {
  return cat.toLowerCase().replace(/\s+/g, "-");
}