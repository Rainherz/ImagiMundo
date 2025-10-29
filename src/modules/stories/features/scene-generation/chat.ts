import { generateObject } from 'ai'
import { geminiFlash } from '../../lib/gemini-client'
import { generateFirstScenePrompt, generateNextScenePrompt } from '../../lib/prompts'
import { SceneOutputSchema, type StoryInitInput, type StoryContinueInput } from '../../entities/models/sceneGeneration'

// Almacenar contexto de historias (en producción usar BD)
const storyContexts = new Map<string, {
  title: string
  description: string
  locality: string
  actors: string[]
  sceneCount: number
  wordsPerScene: number
  currentScene: number
  history: string // Resumen de lo que pasó hasta ahora
}>()

export async function initializeStory(input: StoryInitInput) {
  const storyId = Math.random().toString(36).substring(7)
  
  // Guardar contexto
  storyContexts.set(storyId, {
    title: input.storyTitle,
    description: input.storyDescription,
    locality: input.userLocality,
    actors: input.actors || [],
    sceneCount: input.sceneCount,
    wordsPerScene: input.wordsPerScene,
    currentScene: 1,
    history: '',
  })

  // Generar primera escena
  const prompt = generateFirstScenePrompt(
    input.storyTitle,
    input.storyDescription,
    input.userLocality,
    input.actors,
    input.wordsPerScene
  )

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: SceneOutputSchema,
      prompt,
      temperature: 0.8,
    })

    const scene = result.object
    const context = storyContexts.get(storyId)!
    context.history = scene.content
    context.currentScene = 1

    return {
      storyId,
      scene: {
        ...scene,
        isComplete: context.sceneCount === 1,
      },
    }
  } catch (error) {
    console.error('Error generating first scene:', error)
    storyContexts.delete(storyId)
    throw new Error('No se pudo generar la primera escena.')
  }
}

export async function continueStory(input: StoryContinueInput) {
  const context = storyContexts.get(input.storyId)
  if (!context) {
    throw new Error('Historia no encontrada. Inicia una nueva.')
  }

  // Incrementar número de escena
  context.currentScene += 1

  // Generar siguiente escena basada en la opción elegida
  const prompt = generateNextScenePrompt(
    context.title,
    context.description,
    context.locality,
    context.actors,
    context.currentScene,
    context.sceneCount,
    context.history,
    input.selectedOption,
    context.wordsPerScene
  )

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: SceneOutputSchema,
      prompt,
      temperature: 0.8,
    })

    const scene = result.object
    context.history += `\n\n[Opción elegida: ${input.selectedOption}]\n\n${scene.content}`

    const isComplete = context.currentScene >= context.sceneCount

    if (isComplete) {
      storyContexts.delete(input.storyId)
    }

    return {
      storyId: input.storyId,
      scene: {
        ...scene,
        isComplete,
      },
    }
  } catch (error) {
    console.error('Error generating next scene:', error)
    throw new Error('No se pudo generar la siguiente escena.')
  }
}
