import { z } from 'zod'

// Iniciar una nueva historia
export const StoryInitInputSchema = z.object({
  storyTitle: z.string().min(1, 'El título es requerido'),
  storyDescription: z.string().min(1, 'La descripción es requerida'),
  userLocality: z.string().min(1, 'La localidad es requerida'),
  actors: z.array(z.string()).optional(),
  sceneCount: z.number().int().min(1).max(20),
  wordsPerScene: z.number().int().min(50).max(500),
})

// Continuar historia (usuario elige opción)
export const StoryContinueInputSchema = z.object({
  storyId: z.string(),
  selectedOption: z.string(),
})

// Salida de una escena
export const SceneOutputSchema = z.object({
  scene_number: z.number(),
  content: z.string(),
  options: z.array(z.string()).min(2).max(4),
  imagePrompt: z.string(),
  isComplete: z.boolean(), // true si es la última escena
})

// Respuesta de inicio
export const StoryInitResponseSchema = z.object({
  storyId: z.string(),
  scene: SceneOutputSchema,
})

// Respuesta de continuación
export const StoryContinueResponseSchema = z.object({
  storyId: z.string(),
  scene: SceneOutputSchema,
})

export type StoryInitInput = z.infer<typeof StoryInitInputSchema>
export type StoryContinueInput = z.infer<typeof StoryContinueInputSchema>
export type SceneOutput = z.infer<typeof SceneOutputSchema>
export type StoryInitResponse = z.infer<typeof StoryInitResponseSchema>
export type StoryContinueResponse = z.infer<typeof StoryContinueResponseSchema>
