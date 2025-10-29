export const generateActorPrompt = (
  name: string,
  description: string,
  locality: string
): string => {
  return `Eres un experto en creación de personajes para cuentos infantiles que refuerzan la identidad cultural.

Crea un personaje detallado basado en la siguiente información:

NOMBRE: ${name}
DESCRIPCIÓN INICIAL: ${description}
LOCALIDAD/REGIÓN: ${locality}

REQUISITOS:
- El personaje debe reflejar la cultura y tradiciones de ${locality}
- Debe ser apropiado para cuentos infantiles
- Incluir rasgos de personalidad coherentes
- Definir un rol claro en la historia
- Incluir 3-5 características especiales únicas

Responde ÚNICAMENTE con un JSON válido en este formato exacto:
{
  "name": "${name}",
  "description": "Descripción detallada del personaje (2-3 oraciones)...",
  "personality": "Rasgos de personalidad principales...",
  "role": "Rol que juega en historias (ej: mentor, amigo, antagonista)...",
  "culturalBackground": "Trasfondo cultural específico de ${locality}...",
  "specialTraits": ["Característica 1", "Característica 2", "Característica 3"]
}

Asegúrate de que el JSON sea válido y parseable.`
}
