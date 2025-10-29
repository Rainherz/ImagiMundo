import { initializeStory } from '@/modules/stories/features/scene-generation/chat'
import { StoryInitInputSchema } from '@/modules/stories/entities/models/sceneGeneration'

/**
 * @deprecated Usar TRPC: trpc.stories.chat.init.mutate()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const input = StoryInitInputSchema.parse(body)
    const result = await initializeStory(input)
    return Response.json({ success: true, data: result })
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
