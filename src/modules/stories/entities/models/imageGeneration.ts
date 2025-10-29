import { z } from 'zod'

export const ImageGenerationInputSchema = z.object({
  sceneContent: z.string().min(1, 'El contenido de la escena es requerido'),
  sceneNumber: z.number().int().positive(),
  storyTitle: z.string().min(1, 'El título del cuento es requerido'),
  userLocality: z.string().min(1, 'La localidad es requerida'),
})

export const ImageGenerationOutputSchema = z.object({
  imageUrl: z.string(),
  base64: z.string().optional(),
  mimeType: z.string().optional(),
  prompt: z.string(),
})

export type ImageGenerationInput = z.infer<typeof ImageGenerationInputSchema>
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>
