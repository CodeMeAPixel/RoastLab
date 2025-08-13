import { createOpenAI } from "@ai-sdk/openai"

// OpenAI client
export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
