import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}


export function ProperCase(str){
  return str
    .toLowerCase()
    .split(/\s+|-/)
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
}


