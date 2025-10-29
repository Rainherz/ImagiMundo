import { google } from '@ai-sdk/google'

// Modelos disponibles - la API key se obtiene de GOOGLE_GENERATIVE_AI_API_KEY
export const geminiFlash = google('gemini-2.0-flash')
export const geminiFlashLite = google('gemini-2.0-flash-lite')
export const geminiImagePreview = google('gemini-2.5-flash-image-preview')
