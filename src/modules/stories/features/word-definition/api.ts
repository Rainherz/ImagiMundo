import { generateObject } from 'ai'
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

    return result.object
  } catch (error) {
    console.error('Error defining word:', error)
    throw new Error(`No se pudo definir la palabra "${input.word}". Intenta de nuevo.`)
  }
}
