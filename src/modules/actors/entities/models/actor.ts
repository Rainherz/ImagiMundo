import { z } from 'zod'

// Input para generar un personaje
export const ActorGenerationInputSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  locality: z.string().min(1, 'La localidad es requerida'),
})

// Output de generación de personaje
export const ActorGenerationOutputSchema = z.object({
  name: z.string(),
  description: z.string(),
  personality: z.string(),
  role: z.string(),
  culturalBackground: z.string(),
  specialTraits: z.array(z.string()),
})

// Actor guardado en BD
export const ActorSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
})

export type ActorGenerationInput = z.infer<typeof ActorGenerationInputSchema>
export type ActorGenerationOutput = z.infer<typeof ActorGenerationOutputSchema>
export type Actor = z.infer<typeof ActorSchema>