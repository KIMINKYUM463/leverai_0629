import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
  return `${baseUrl}${path}`
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat("ko-KR", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "KRW"
    notation?: Intl.NumberFormatOptions["notation"]
  } = {},
) {
  const { currency = "KRW", notation = "standard" } = options

  const numericPrice = typeof price === "string" ? Number.parseFloat(price) : price

  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice)
}
