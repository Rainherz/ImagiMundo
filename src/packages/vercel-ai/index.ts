import { generateText, LanguageModel } from "ai"
import GeminiModel from "../gemini"

export default class AiManager {
    
    private constructor(){
        throw "USE LOS METODOS ESTATICOS DE CLASE"
    }

    static async genText(prompt: string){
        const {text} = await generateText({
            model: GeminiModel,
            prompt: prompt,
        })
    }
}

