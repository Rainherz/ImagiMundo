import prisma from '@/packages/prisma'
import { z } from 'zod'

const SaveActorSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
})

/**
 * @deprecated Usar TRPC: trpc.actors.save.mutate()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const input = SaveActorSchema.parse(body)

    const actor = await prisma.actor.create({
      data: {
        name: input.name,
        description: input.description,
      },
    })

    return Response.json({ success: true, data: actor })
  } catch (error: any) {
    console.error('Error saving actor:', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
