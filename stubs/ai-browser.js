// Browser-side stub for AI SDK to prevent server-only modules from being bundled
// This file provides empty implementations that throw errors if accidentally called on client

export function generateText() {
  throw new Error("generateText can only be used on the server side")
}

export function generateObject() {
  throw new Error("generateObject can only be used on the server side")
}

export function streamText() {
  throw new Error("streamText can only be used on the server side")
}

export function streamObject() {
  throw new Error("streamObject can only be used on the server side")
}

export function openai() {
  throw new Error("openai can only be used on the server side")
}

// Default export for compatibility
export default {
  generateText,
  generateObject,
  streamText,
  streamObject,
  openai,
}
