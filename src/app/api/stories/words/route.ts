import { defineWord } from '@/modules/stories/features/word-definition/api';
import { WordDefinitionInputSchema } from '@/modules/stories/entities/models/wordDefinition';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = WordDefinitionInputSchema.parse(body);
    const result = await defineWord(input);
    return Response.json({ success: true, data: result });
  } catch (error: any) {
    return Response.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
