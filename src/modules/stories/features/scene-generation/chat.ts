import { generateObject } from 'ai'
import prisma from '@/packages/prisma'
import { geminiFlash } from '../../lib/gemini-client'
import { generateFirstScenePrompt, generateNextScenePrompt } from '../../lib/prompts'
import { SceneOutputSchema, type StoryInitInput, type StoryContinueInput } from '../../entities/models/sceneGeneration'

// Contexto en caché para optimizar (se sincroniza con BD)
const storyContexts = new Map<string, {
  title: string
  description: string
  locality: string
  actors: string[]
  sceneCount: number
  wordsPerScene: number
  currentScene: number
  history: string
}>()

export async function initializeStory(input: StoryInitInput) {
  const storyId = Math.random().toString(36).substring(7)
  
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

    // Guardar en caché (siempre)
    storyContexts.set(storyId, {
      title: input.storyTitle,
      description: input.storyDescription,
      locality: input.userLocality,
      actors: input.actors || [],
      sceneCount: input.sceneCount,
      wordsPerScene: input.wordsPerScene,
      currentScene: 1,
      history: scene.content,
    })

    // Guardar en BD (opcional - solo si se especifica)
    try {
      await prisma.story.create({
        data: {
          id: storyId,
          titulo: input.storyTitle,
          synopsis: input.storyDescription,
          image: '',
          size: input.sceneCount,
          sceneSize: input.wordsPerScene,
        },
      })

      await prisma.scene.create({
        data: {
          storyId,
          sceneNumber: 1,
          content: scene.content,
          imageUrl: null,
          options: JSON.stringify(scene.options),
        },
      })
    } catch (dbError) {
      console.warn('BD no disponible, continuando sin persistencia:', dbError)
    }

    return {
      storyId,
      scene: {
        ...scene,
        isComplete: input.sceneCount === 1,
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
    // Intentar recuperar de BD (opcional)
    try {
      const story = await prisma.story.findUnique({
        where: { id: input.storyId },
      })
      if (story) {
        const scenes = await prisma.scene.findMany({
          where: { storyId: input.storyId },
          orderBy: { sceneNumber: 'asc' },
        })
        const history = scenes.map(s => s.content).join('\n\n')
        const newContext = {
          title: story.titulo,
          description: story.synopsis,
          locality: '',
          actors: [],
          sceneCount: story.size,
          wordsPerScene: story.sceneSize,
          currentScene: scenes.length,
          history,
        }
        storyContexts.set(input.storyId, newContext)
      }
    } catch (dbError) {
      console.warn('No se pudo recuperar de BD:', dbError)
    }
    
    if (!storyContexts.has(input.storyId)) {
      throw new Error('Historia no encontrada. Inicia una nueva.')
    }
  }

  const context2 = storyContexts.get(input.storyId)!

  // Incrementar número de escena
  context2.currentScene += 1

  // Generar siguiente escena basada en la opción elegida
  const prompt = generateNextScenePrompt(
    context2.title,
    context2.description,
    context2.locality,
    context2.actors,
    context2.currentScene,
    context2.sceneCount,
    context2.history,
    input.selectedOption,
    context2.wordsPerScene
  )

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: SceneOutputSchema,
      prompt,
      temperature: 0.8,
    })

    const scene = result.object
    context2.history += `\n\n[Opción elegida: ${input.selectedOption}]\n\n${scene.content}`

    // Guardar escena en BD (opcional - no bloquea si falla)
    try {
      await prisma.scene.create({
        data: {
          storyId: input.storyId,
          sceneNumber: context2.currentScene,
          content: scene.content,
          imageUrl: null,
          options: JSON.stringify(scene.options),
        },
      })
    } catch (dbError) {
      console.warn('No se guardó escena en BD:', dbError)
    }

    const isComplete = context2.currentScene >= context2.sceneCount

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
