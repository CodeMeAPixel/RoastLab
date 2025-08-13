"use server"

import { generateObject } from "ai"
import { z } from "zod"

import { PSIData } from "./psiAnalyzer"
import { openai } from "./aiClient"
import { SEOData } from "./seoAnalyzer"
import { sanitizeInput } from "./utils"

export async function generateSuggestions
  seoData: SEOData,
  psiData: PSIData
): Promise<string[]> {
  "use server"

  const sanitizedSeoData = sanitizeInput(seoData)
  const sanitizedPSIData = sanitizeInput(psiData)

  const prompt = `
You are RoastLab — an expert SEO, UX, UI, and performance consultant. Voice: witty and sarcastic but helpful, concise, and laser-focused on impact. No fluff.

Context (JSON):
- SEO Data: ${JSON.stringify(sanitizedSeoData)}
- Lighthouse (PageSpeed Insights) Mobile: ${JSON.stringify(sanitizedPSIData.mobile)}
- Lighthouse (PageSpeed Insights) Desktop: ${JSON.stringify(sanitizedPSIData.desktop)}

Task:
- Return a prioritized list of the most impactful recommendations to improve SEO and performance (Lighthouse metrics).
- For each suggestion, do ALL of the following:
  - Title: punchy, sarcastic, ≤ 8 words.
  - Message: 2–4 concise sentences with a specific action and why it matters.
  - Reference metrics with numbers when possible (e.g., "LCP 4.1s on mobile", "Performance score 68").
  - Indicate scope: Mobile, Desktop, or Both.
  - Include inline "Impact: High|Medium|Low; Effort: Low|Medium|High".
  - Add one concrete implementation hint (e.g., preload hero image, self-host fonts, defer 3rd-party scripts, compress to WebP, preconnect, reduce DOM, critical CSS, cache headers).

Constraints:
- 6–10 suggestions total; quick wins first; avoid duplicates and hedging.
- If a metric is missing, write "data missing" rather than guessing.
- No code blocks or markdown; no disclaimers; keep tone witty but professional.

Output mapping to schema:
- name = the title.
- message = the full suggestion body including scope, metrics, impact/effort, and implementation hint.
`

  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    temperature: 0.5,
    prompt: prompt,
    schema: z.object({
      text: z.array(
        z.object({
          name: z
            .string()
            .describe(
              "title of the suggestion but with a sarcastic, ironic and funny touch"
            ),
          message: z
            .string()
            .describe(
              "The suggestion itself but with a sarcastic, ironic and funny touch"
            ),
        })
      ),
    }),
  })

  const suggestions = object.text.map(
    (suggestion) => `${suggestion.name}: ${suggestion.message}`
  )
  return suggestions
}
