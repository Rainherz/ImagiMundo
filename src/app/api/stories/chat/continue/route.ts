import { continueStory } from '@/modules/stories/features/scene-generation/chat'
import { StoryContinueInputSchema } from '@/modules/stories/entities/models/sceneGeneration'

/**
 * @deprecated Usar TRPC: trpc.stories.chat.continue.mutate()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const input = StoryContinueInputSchema.parse(body)
    const result = await continueStory(input)
    return Response.json({ success: true, data: result })
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
