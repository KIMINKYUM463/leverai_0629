"use server"

/* ============================================================================
   generateAndSaveImage()
   ----------------------------------------------------------------------------
   • Calls Replicate when possible.
   • If Replicate is unreachable (missing token, network error, CORS, preview
     sandbox without outbound internet, etc.), falls back to an Unsplash image
     that matches the keyword so the client always gets an image.
============================================================================ */

const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN ?? ""
const HOST = "https://api.replicate.com/v1"
const OWNER = "google"
const MODEL = "imagen-3-fast"
const MAX_POLLS = 20 /* 20×2 s ≈ 40 s */

export interface GenerateResult {
  success: boolean
  imageUrl?: string
  fileName?: string
  error?: string
}

/*───────────────────────────── helpers ────────────────────────────────────*/
function fallbackUrl(keyword: string) {
  const q = encodeURIComponent(keyword || "agriculture")
  return `https://source.unsplash.com/random/800x800?${q}`
}
function name(type: string) {
  return `${type}_${Date.now()}.jpg`
}

/* cache model version for the life of the serverless bundle                */
let cachedVersion: string | null = null
async function getModelVersion(): Promise<string> {
  if (cachedVersion) return cachedVersion

  const res = await fetch(`${HOST}/models/${OWNER}/${MODEL}`, {
    headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
    cache: "no-store",
  })
  if (!res.ok) throw new Error(`model meta ${res.status}`)
  cachedVersion = (await res.json()).latest_version?.id
  if (!cachedVersion) throw new Error("latest_version.id missing")
  return cachedVersion
}

/*───────────────────────────── main export ────────────────────────────────*/
export async function generateAndSaveImage(prompt: string, keyword = ""): Promise<GenerateResult> {
  /* ---------- early-out if we have no token --------------------------------*/
  if (!REPLICATE_TOKEN) {
    return { success: true, imageUrl: fallbackUrl(keyword), fileName: name("unsplash") }
  }

  try {
    /* 1️⃣  latest model version --------------------------------------------*/
    const version = await getModelVersion()

    /* 2️⃣  create prediction ----------------------------------------------*/
    const create = await fetch(`${HOST}/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${REPLICATE_TOKEN}`,
      },
      body: JSON.stringify({
        version,
        input: { prompt, aspect_ratio: "1:1", output_format: "png" },
      }),
    })
    if (!create.ok) throw new Error(`create ${await create.text()}`)
    const { id } = await create.json()

    /* 3️⃣  poll until complete -------------------------------------------*/
    let url: string | undefined
    for (let i = 0; i < MAX_POLLS; i++) {
      await new Promise((r) => setTimeout(r, 2000))
      const poll = await fetch(`${HOST}/predictions/${id}`, {
        headers: { Authorization: `Token ${REPLICATE_TOKEN}` },
        cache: "no-store",
      }).then((r) => r.json())

      if (poll.status === "succeeded") {
        const out = poll.output
        url = Array.isArray(out) ? out[0] : out
        break
      }
      if (["failed", "canceled"].includes(poll.status)) {
        throw new Error(`status ${poll.status}`)
      }
    }
    if (!url) throw new Error("timeout")

    /* 4️⃣  done -----------------------------------------------------------*/
    return { success: true, imageUrl: url, fileName: name("ai") }
  } catch (err) {
    /* ---------- ANY failure ⇒ graceful Unsplash fallback -------------------*/
    console.error("generateAndSaveImage error:", err)
    return { success: true, imageUrl: fallbackUrl(keyword), fileName: name("unsplash") }
  }
}
