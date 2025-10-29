import { generateStoryScenes } from '@/modules/stories/features/scene-generation/api';
import { SceneGenerationInputSchema } from '@/modules/stories/entities/models/sceneGeneration';

/**
 * @deprecated Usar TRPC: trpc.stories.scenes.generate.mutate()
 * Este endpoint es un wrapper para compatibilidad hacia atrás
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = SceneGenerationInputSchema.parse(body);
    const result = await generateStoryScenes(input);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
