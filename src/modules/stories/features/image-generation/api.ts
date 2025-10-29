import { generateText } from 'ai'
import { geminiImagePreview } from '../../lib/gemini-client'
import { generateImagePrompt } from '../../lib/prompts'
import type { ImageGenerationInput } from '../../entities/models/imageGeneration'

export async function generateSceneImage(input: ImageGenerationInput) {
  const promptDescription = generateImagePrompt(
    input.sceneContent,
    input.sceneNumber,
    input.storyTitle,
    input.userLocality
  )

  try {
    const result = await generateText({
      model: geminiImagePreview,
      prompt: promptDescription,
      temperature: 0.8,
    })

    // Buscar imagen en la respuesta
    const imageFile = result?.files?.find((f: any) =>
      f.mediaType?.startsWith('image/')
    )

    if (imageFile?.base64) {
      return {
        base64: imageFile.base64,
        mimeType: imageFile.mediaType,
        prompt: promptDescription,
      }
    }

    // Si no hay imagen, retornar error
    console.error('⚠️ Gemini no devolvió imagen:', result)
    throw new Error('El modelo no devolvió imagen. Intenta reformular la descripción.')
  } catch (error) {
    console.error('Error generating image:', error)
    throw new Error('No se pudo generar la imagen. Intenta de nuevo.')
  }
}
