import { generateObject } from 'ai'
import prisma from '@/packages/prisma'
import { geminiFlash } from '../../lib/gemini-client'
import { defineWordPrompt } from '../../lib/prompts'
import { WordDefinitionOutputSchema, type WordDefinitionInput } from '../../entities/models/wordDefinition'

export async function defineWord(input: WordDefinitionInput) {
  const prompt = defineWordPrompt(input.word, input.context)

  try {
    const result = await generateObject({
      model: geminiFlash,
      schema: WordDefinitionOutputSchema,
      prompt,
      temperature: 0.7,
    })

    const definition = result.object

    // Guardar en BD (opcional - no bloquea si falla)
    try {
      await prisma.wordDefinition.create({
        data: {
          word: input.word,
          definition: definition.definition,
          example: definition.example,
          context: input.context,
        },
      })
    } catch (dbError) {
      console.warn('No se guardó en BD, pero se retorna la definición:', dbError)
    }

    return definition
  } catch (error) {
    console.error('Error defining word:', error)
    throw new Error(`No se pudo definir la palabra "${input.word}". Intenta de nuevo.`)
  }
}
