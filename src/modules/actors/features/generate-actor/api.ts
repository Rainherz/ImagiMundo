import { generateObject } from 'ai'
import { geminiFlash } from '@/modules/stories/lib/gemini-client'
import { generateActorPrompt } from './prompts'
import { ActorGenerationOutputSchema, type ActorGenerationInput } from '../../entities/models/actor'

export async function generateActor(input: ActorGenerationInput) {
  const prompt = generateActorPrompt(
    input.name,
    input.description,
    input.locality
  )

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: ActorGenerationOutputSchema,
      prompt,
      temperature: 0.8,
    })

    return result.object
  } catch (error) {
    console.error('Error generating actor:', error)
    throw new Error('No se pudo generar el personaje. Intenta de nuevo.')
  }
}
