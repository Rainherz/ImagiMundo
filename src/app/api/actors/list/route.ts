import prisma from '@/packages/prisma'

/**
 * @deprecated Usar TRPC: trpc.actors.list.query()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function GET() {
  try {
    const actors = await prisma.actor.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    })

    return Response.json({ success: true, data: actors })
  } catch (error: any) {
    console.error('Error fetching actors:', error)
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    )
  }
}
