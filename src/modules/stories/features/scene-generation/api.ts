import { generateObject } from 'ai'
import { geminiFlash } from '../../lib/gemini-client'
import { generateScenesPrompt } from '../../lib/prompts'
import { ScenesOutputSchema, type SceneGenerationInput } from '../../entities/models/sceneGeneration'

export async function generateStoryScenes(input: SceneGenerationInput) {
  const prompt = generateScenesPrompt(
    input.storyTitle,
    input.storyDescription,
    input.userLocality,
    input.actors,
    input.sceneCount,
    input.wordsPerScene
  )

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: ScenesOutputSchema,
      prompt,
      temperature: 0.8,
    })

    return result.object
  } catch (error) {
    console.error('Error generating story scenes:', error)
    throw new Error('No se pudo generar las escenas del cuento. Intenta de nuevo.')
  }
}
