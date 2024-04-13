import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export const BASE_ROUTE =
  process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
