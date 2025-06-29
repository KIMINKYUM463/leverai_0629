"use server"

import { revalidatePath } from "next/cache"

import { auth } from "@/auth"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const MAX_FREE_COUNTS = 3

export async function generateImageWithReplicate(prompt: string) {
  const session = await auth()

  if (!session?.user?.id) {
    return {
      error: "Unauthorized",
    }
  }

  const freeTrial = await checkSubscription()

  if (!freeTrial) {
    return {
      error: "Free trial has expired.",
    }
  }

  // === Replicate: google/imagen-3-fast latest version hash ===
  const IMAGEN3_FAST_VERSION = "a40eaed2fc535ada73b08707b30558e0dae03f2a605cf0584d29c316a300a5ef"

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN!}`,
      },
      body: JSON.stringify({
        version: IMAGEN3_FAST_VERSION, // 👈 REQUIRED
        input: {
          prompt,
          aspect_ratio: "1:1",
          output_format: "png",
          output_quality: 80,
        },
      }),
    })

    if (!response.ok) {
      console.error("Replicate API error:", response.status, response.statusText)
      try {
        const errorBody = await response.json()
        console.error("Replicate API error details:", errorBody)
      } catch (jsonError) {
        console.error("Error parsing Replicate API error response:", jsonError)
      }
      return {
        error: "Something went wrong with Replicate API",
      }
    }

    const prediction = await response.json()
    return prediction
  } catch (error) {
    console.error("Error generating image:", error)
    return {
      error: "Something went wrong",
    }
  }
}

async function checkSubscription() {
  const session = await auth()

  if (!session?.user?.id) {
    return false
  }

  const subscriptionPlan = await getUserSubscriptionPlan(session.user.id)

  if (subscriptionPlan?.isPro) {
    return true
  }

  const proModal = absoluteUrl("/pro-modal")

  const user = session.user

  if (user) {
    const userCounts = await prismadb.image.count({
      where: {
        userId: user.id,
      },
    })

    if (userCounts >= MAX_FREE_COUNTS) {
      return false
    } else {
      await prismadb.image.create({
        data: {
          userId: user.id,
        },
      })
    }
  }

  revalidatePath("/")
  return true
}

import { prismadb } from "@/lib/prismadb"
