export const generateScenesPrompt = (
  storyTitle: string,
  storyDescription: string,
  userLocality: string,
  actors: string[] | undefined,
  sceneCount: number,
  wordsPerScene: number
): string => {
  const actorsText = actors && actors.length > 0 
    ? `Personajes principales: ${actors.join(', ')}`
    : 'Los personajes serán creados por ti según el contexto del cuento'

  return `Eres un escritor experto en cuentos infantiles que refuerzan la identidad cultural.

Genera exactamente ${sceneCount} escenas para el siguiente cuento:

TÍTULO: ${storyTitle}
DESCRIPCIÓN: ${storyDescription}
LOCALIDAD DEL USUARIO: ${userLocality}
${actorsText}

REQUISITOS:
- Cada escena debe tener aproximadamente ${wordsPerScene} palabras
- Cada escena debe incluir 3 opciones de continuación (acciones que el usuario puede elegir)
- Las narrativas deben reflejar elementos culturales, tradiciones y contexto de ${userLocality}
- El lenguaje debe ser amigable para niños
- Cada escena debe ser coherente con la anterior

Responde ÚNICAMENTE con un JSON válido en este formato exacto, sin explicaciones adicionales:
{
  "scenes": [
    {
      "scene_number": 1,
      "content": "Texto de la escena aquí...",
      "options": ["Opción 1", "Opción 2", "Opción 3"],
      "imagePrompt": "Descripción detallada para generar imagen: [describe la escena, personajes, ambiente, elementos culturales]"
    }
  ]
}

Asegúrate de que el JSON sea válido y parseable.`
}

export const defineWordPrompt = (word: string, context: string): string => {
  return `Eres un educador experto en vocabulario para niños.

Define la siguiente palabra en el contexto dado:

PALABRA: ${word}
CONTEXTO: "${context}"

Proporciona:
1. Una definición clara y simple para niños
2. Un ejemplo amigable y relatable

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{
  "word": "${word}",
  "definition": "Definición clara y simple aquí...",
  "example": "Ejemplo amigable aquí...",
  "contextRelevance": "Cómo se relaciona con el contexto dado..."
}

Asegúrate de que el JSON sea válido y parseable.`
}

export const generateFirstScenePrompt = (
  storyTitle: string,
  storyDescription: string,
  userLocality: string,
  actors: string[] | undefined,
  wordsPerScene: number
): string => {
  const actorsText = actors && actors.length > 0 
    ? `Personajes principales: ${actors.join(', ')}`
    : 'Los personajes serán creados por ti según el contexto del cuento'

  return `Eres un escritor experto en cuentos infantiles que refuerzan la identidad cultural.

Genera la PRIMERA ESCENA del siguiente cuento:

TÍTULO: ${storyTitle}
DESCRIPCIÓN: ${storyDescription}
LOCALIDAD: ${userLocality}
${actorsText}

REQUISITOS:
- La escena debe tener aproximadamente ${wordsPerScene} palabras
- Debe incluir 3 opciones de continuación (acciones que el usuario puede elegir)
- Debe reflejar elementos culturales, tradiciones y contexto de ${userLocality}
- Lenguaje amigable para niños
- Esta es la INTRODUCCIÓN de la historia, presenta el escenario y personajes

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{
  "scene_number": 1,
  "content": "Texto de la primera escena aquí...",
  "options": ["Opción 1", "Opción 2", "Opción 3"],
  "imagePrompt": "Descripción detallada para generar imagen..."
}`
}

export const generateNextScenePrompt = (
  storyTitle: string,
  storyDescription: string,
  userLocality: string,
  actors: string[],
  currentScene: number,
  totalScenes: number,
  previousHistory: string,
  selectedOption: string,
  wordsPerScene: number
): string => {
  const isLastScene = currentScene === totalScenes
  
  return `Eres un escritor experto en cuentos infantiles que refuerzan la identidad cultural.

Continúa la historia basándote en la opción que el usuario eligió.

TÍTULO: ${storyTitle}
DESCRIPCIÓN: ${storyDescription}
LOCALIDAD: ${userLocality}
ESCENA ACTUAL: ${currentScene} de ${totalScenes}

HISTORIA HASTA AHORA:
${previousHistory}

OPCIÓN ELEGIDA POR EL USUARIO: "${selectedOption}"

REQUISITOS:
- La escena debe tener aproximadamente ${wordsPerScene} palabras
- Debe reflejar la opción elegida por el usuario
- Debe mantener coherencia con la historia anterior
- Debe reflejar elementos culturales de ${userLocality}
- Lenguaje amigable para niños
${isLastScene ? `
- ⚠️ ESTA ES LA ÚLTIMA ESCENA (${currentScene}/${totalScenes})
- DEBE CERRAR LA HISTORIA DE FORMA SATISFACTORIA Y COMPLETA
- Proporciona un final emocionante, coherente y memorable
- Las opciones deben ser reflexiones o acciones finales (no continuaciones)
- Resuelve los conflictos principales de la historia
- Deja una lección o mensaje positivo
` : `
- Debe incluir 3 opciones de continuación para la siguiente escena
`}

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{
  "scene_number": ${currentScene},
  "content": "Texto de la escena aquí, continuando desde la opción elegida...",
  "options": [${isLastScene ? '"Reflexionar sobre la aventura", "Compartir la historia", "Fin"' : '"Opción 1", "Opción 2", "Opción 3"'}],
  "imagePrompt": "Descripción detallada para generar imagen..."
}`
}

export const generateImagePrompt = (
  sceneContent: string,
  sceneNumber: number,
  storyTitle: string,
  userLocality: string
): string => {
  return `You are an expert in generating images for children's stories.
Generate only an image and nothing else.
Do not include text or captions in your response.

Create a vibrant, colorful illustration for this scene:

Story Title: ${storyTitle}
Scene #${sceneNumber}
Location: ${userLocality}
Scene Content: ${sceneContent}

Requirements:
- Colorful and attractive for children
- Reflect cultural elements of ${userLocality}
- Include characters and environment from the scene
- Children's illustration style
- Warm and engaging atmosphere

Generate the image now.`
}
