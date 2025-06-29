import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { headers } from "next/headers"

/**
 * Merge TailwindCSS classes and conditionally join class names.
 *
 * @example
 * const classes = cn("p-4", isActive && "bg-green-500")
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Construct an absolute URL that works on the server (including edge),
 * during static generation, and in the browser.
 *
 * Order of precedence for the base URL:
 *   1. NEXT_PUBLIC_APP_URL (set manually in Vercel dashboard or .env)
 *   2. NEXT_PUBLIC_VERCEL_URL (provided automatically on Vercel)
 *   3. Request headers (x-forwarded-host / host) on the server
 *   4. window.location.origin on the client
 *
 * @param path  A relative path such as "/dashboard" or "api/health"
 * @returns     Fully-qualified URL string, e.g. "https://acme.com/dashboard"
 */
export function absoluteUrl(path: string): string {
  // Strip multiple leading/trailing slashes for safety
  const sanitize = (str: string) => str.replace(/\/+$/, "").replace(/^\/+/, "")

  const publicBase = process.env.NEXT_PUBLIC_APP_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL ?? ""

  // 1) If we have an explicit public base URL from env, use it.
  if (publicBase) {
    return `${sanitize(publicBase)}/${sanitize(path)}`
  }

  // 2) On the client we can fall back to window.location.
  if (typeof window !== "undefined") {
    return `${window.location.origin}/${sanitize(path)}`
  }

  // 3) On the server, derive from request headers.
  const h = headers()
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000"
  const protocol = host.startsWith("localhost") ? "http" : "https"

  return `${protocol}://${host}/${sanitize(path)}`
}
