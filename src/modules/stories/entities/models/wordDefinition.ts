import { z } from 'zod'

export const WordDefinitionInputSchema = z.object({
  word: z.string().min(1, 'La palabra es requerida'),
  context: z.string().min(1, 'El contexto es requerido'),
})

export const WordDefinitionOutputSchema = z.object({
  word: z.string(),
  definition: z.string(),
  example: z.string(),
  contextRelevance: z.string(),
})

export type WordDefinitionInput = z.infer<typeof WordDefinitionInputSchema>
export type WordDefinitionOutput = z.infer<typeof WordDefinitionOutputSchema>
