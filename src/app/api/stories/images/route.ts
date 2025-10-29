import { generateSceneImage } from '@/modules/stories/features/image-generation/api';
import { ImageGenerationInputSchema } from '@/modules/stories/entities/models/imageGeneration';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = ImageGenerationInputSchema.parse(body);
    const result = await generateSceneImage(input);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
