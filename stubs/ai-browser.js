/**
 * Very small ESM stub for `ai` **and** `@ai-sdk/openai`.
 * Any attempt to use these utilities in the browser will throw —
 * you must call them from a Server Action / Route Handler.
 */
const serverOnly = (name) => () => {
  throw new Error(`"${name}" is server-only. Move this logic into a Server Action or Route Handler.`)
}

// Re-export the helpers most commonly imported from `ai`
export const generateObject = serverOnly("generateObject")
export const generateText = serverOnly("generateText")
export const streamText = serverOnly("streamText")

// And a default export so `import openai from ...` still resolves.
const openai = serverOnly("openai")
export { openai as default, openai }

// Empty placeholder types so `import type` statements compile.
export const type = {}

/**
 * You can safely tree-shake this file out of the server bundle;
 * it exists purely to satisfy the browser build.
 */
