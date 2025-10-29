import { generateText } from "ai";
import prisma from "@/packages/prisma";
import { geminiImagePreview } from "../../lib/gemini-client";
import { generateImagePrompt } from "../../lib/prompts";
import type { ImageGenerationInput } from "../../entities/models/imageGeneration";

export async function generateSceneImage(input: ImageGenerationInput) {
  const promptDescription = generateImagePrompt(
    input.sceneContent,
    input.sceneNumber,
    input.storyTitle,
    input.userLocality
  );

  try {
    const result = await generateText({
      model: geminiImagePreview,
      prompt: promptDescription,
      temperature: 0.8,
    });

    const json = JSON.stringify(result, null, 2);
    const maxLength = 200; // máximo de 500 caracteres
    console.log(
      "Resultado de Gemini Image Preview:",
      json.length > maxLength ? json.slice(0, maxLength) + "..." : json
    );

    const imageFile = result?.steps
      ?.flatMap((step) => step.content ?? [])
      ?.find(
        (c): c is Extract<typeof c, { type: "file"; file: any }> =>
          c.type === "file" && !!c.file?.base64
      );

    if (imageFile) {
      console.log("Base64:", imageFile.file.base64.slice(0, 100) + "...");
    }

    if (imageFile) {
      const base64Data = imageFile.file.base64;
      const mimeType = imageFile.file.mediaType;

      // Guardar en BD (actualizar escena con URL de imagen)
      // En producción, guardarías en un servicio de almacenamiento (S3, etc)
      // Por ahora guardamos el base64 en la BD
      // const dataUrl = `data:${mimeType};base64,${base64Data}`

      // Buscar y actualizar la escena
      // const scene = await prisma.scene.findFirst({
      //   where: {
      //     sceneNumber: input.sceneNumber,
      //   },
      //   orderBy: { createdAt: 'desc' },
      // })

      // if (scene) {
      //   await prisma.scene.update({
      //     where: { id: scene.id },
      //     data: { imageUrl: dataUrl },
      //   })
      // }

      return {
        base64: base64Data,
        mimeType: mimeType,
        prompt: promptDescription,
      };
    }

    // Si no hay imagen, retornar error
    console.error("⚠️ Gemini no devolvió imagen:", result);
    throw new Error(
      "El modelo no devolvió imagen. Intenta reformular la descripción."
    );
  } catch (error) {
    console.error("Error generating image:", error);
    // Retornar error pero no bloquear
    return {
      base64: "",
      mimeType: "",
      prompt: promptDescription,
    };
  }
}
