import { generateActor } from '@/modules/actors/features/generate-actor/api'
import { ActorGenerationInputSchema } from '@/modules/actors/entities/models/actor'

/**
 * @deprecated Usar TRPC: trpc.actors.generate.mutate()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const input = ActorGenerationInputSchema.parse(body)
    const result = await generateActor(input)
    return Response.json({ success: true, data: result })
  } catch (error: any) {
    console.error('Error in POST /api/actors/generate:', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
