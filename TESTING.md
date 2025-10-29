# 🧪 Testing - Endpoints REST


---

## Test 1: Definir Palabra

**URL:**
```
POST http://localhost:3000/api/stories/words
```

**Body:**
```json
{
  "word": "misterio",
  "context": "Pedrito descubrió un misterio en el mercado"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "word": "misterio",
    "definition": "Algo que no se entiende o es desconocido",
    "example": "El detective resolvió el misterio",
    "contextRelevance": "En la escena, Pedrito encuentra algo que no comprende"
  }
}
```

---

## Test 2: Generar Imagen

**URL:**
```
POST http://localhost:3000/api/stories/images
```

**Body:**
```json
{
  "sceneContent": "Pedrito caminaba por las coloridas calles de Medellín cuando decidió explorar el famoso mercado de San Alejo.",
  "sceneNumber": 1,
  "storyTitle": "El Viaje de Pedrito",
  "userLocality": "Medellín, Colombia"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "imageUrl": "data:image/png;base64,...",
    "base64": "...",
    "mimeType": "image/png",
    "prompt": "..."
  }
}
```



# 🧪 Testing - Chat Conversacional

## Endpoints

```
POST http://localhost:3000/api/stories/chat/init      # Iniciar historia
POST http://localhost:3000/api/stories/chat/continue  # Continuar con opción elegida
```

---

## Test 1: Iniciar Historia

**URL:**
```
POST http://localhost:3000/api/stories/chat/init
```

**Body:**
```json
{
  "storyTitle": "El Viaje de Pedrito",
  "storyDescription": "Un niño descubre un misterio en el mercado local",
  "userLocality": "Medellín, Colombia",
  "actors": ["Pedrito", "Don Carlos"],
  "sceneCount": 3,
  "wordsPerScene": 120
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "storyId": "abc123xyz",
    "scene": {
      "scene_number": 1,
      "content": "Pedrito caminaba por las coloridas calles de Medellín...",
      "options": [
        "Hablar con Don Carlos",
        "Explorar más el mercado",
        "Buscar a su mamá"
      ],
      "imagePrompt": "A young boy in traditional Colombian clothing...",
      "isComplete": false
    }
  }
}
```

**Guarda el `storyId` para los siguientes requests.**

---

## Test 2: Continuar Historia (Escena 2)

**URL:**
```
POST http://localhost:3000/api/stories/chat/continue
```

**Body:**
```json
{
  "storyId": "abc123xyz",
  "selectedOption": "Hablar con Don Carlos"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "storyId": "abc123xyz",
    "scene": {
      "scene_number": 2,
      "content": "Don Carlos le sonrió a Pedrito y le mostró una caja antigua...",
      "options": [
        "Abrir la caja",
        "Preguntar sobre la caja",
        "Irse del lugar"
      ],
      "imagePrompt": "An old wooden box with mysterious markings...",
      "isComplete": false
    }
  }
}
```

---

## Test 3: Continuar Historia (Escena 3 - Final)

**URL:**
```
POST http://localhost:3000/api/stories/chat/continue
```

**Body:**
```json
{
  "storyId": "abc123xyz",
  "selectedOption": "Abrir la caja"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "storyId": "abc123xyz",
    "scene": {
      "scene_number": 3,
      "content": "Dentro de la caja, Pedrito encontró un mapa antiguo que mostraba lugares secretos de Medellín...",
      "options": [
        "Seguir el mapa",
        "Mostrar el mapa a Don Carlos",
        "Guardar el mapa"
      ],
      "imagePrompt": "An ancient map with mysterious markings...",
      "isComplete": true
    }
  }
}
```

**Nota:** `isComplete: true` indica que es la última escena.

---

## ✅ Características

- ✅ Una escena a la vez
- ✅ Usuario elige opción
- ✅ IA continúa basada en la opción
- ✅ Contexto se mantiene
- ✅ Termina cuando se alcanza `sceneCount`
- ✅ `isComplete: true` en la última escena

---

## 🔄 Flujo Completo

```
1. POST /api/stories/chat/init
   ↓ Recibe storyId y primera escena
   
2. Usuario elige una opción
   ↓
   
3. POST /api/stories/chat/continue
   ↓ Recibe siguiente escena
   
4. Repetir pasos 2-3 hasta isComplete: true
```

---

## 🐛 Errores

**400 Bad Request:**
- Verifica que el JSON es válido
- Verifica que todos los campos requeridos están presentes

**Historia no encontrada:**
- El `storyId` es inválido o expiró
- Inicia una nueva historia

**Timeout:**
- Reduce `sceneCount` o `wordsPerScene`
- Verifica tu conexión

# 🎭 Testing - Generación de Personajes

## Endpoints

```
POST /api/actors/generate   # Generar personaje con IA
POST /api/actors/save       # Guardar personaje en BD
GET  /api/actors/list       # Listar personajes guardados
```

---

## Test 1: Generar Personaje

**URL:**
```
POST http://localhost:3000/api/actors/generate
```

**Body:**
```json
{
  "name": "Don Carlos",
  "description": "Un vendedor de frutas exóticas en el mercado que conoce historias antiguas",
  "locality": "Medellín, Colombia"
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "name": "Don Carlos",
    "description": "Un vendedor de frutas exóticas en el mercado que conoce historias antiguas...",
    "personality": "Amable, sabio, paciente, con sentido del humor",
    "role": "Mentor y guía",
    "culturalBackground": "Descendiente de comerciantes paisa, conocedor de tradiciones colombianas",
    "specialTraits": [
      "Conoce historias de la región",
      "Habla con acento paisa auténtico",
      "Tiene conexiones en el mercado"
    ]
  }
}
```

---

## Test 2: Guardar Personaje

**URL:**
```
POST http://localhost:3000/api/actors/save
```

**Body:**
```json
{
  "name": "Don Carlos",
  "description": "Un vendedor de frutas exóticas en el mercado que conoce historias antiguas. Amable, sabio, paciente. Descendiente de comerciantes paisa, conocedor de tradiciones colombianas."
}
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Don Carlos",
    "description": "Un vendedor de frutas exóticas..."
  }
}
```

---

## Test 3: Listar Personajes

**URL:**
```
GET http://localhost:3000/api/actors/list
```

**Respuesta (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Don Carlos",
      "description": "Un vendedor de frutas exóticas..."
    },
    {
      "id": "660e8400-e29b-41d4-a716-446655440001",
      "name": "Pedrito",
      "description": "Un niño curioso de 8 años..."
    }
  ]
}
```

---

## Flujo Completo

```
1. POST /api/actors/generate
   ↓ IA genera personaje detallado

2. Usuario revisa el personaje generado
   ↓

3. POST /api/actors/save
   ↓ Guarda en BD

4. GET /api/actors/list
   ↓ Obtiene lista de personajes

5. Usar personajes en POST /api/stories/chat/init
   ↓ Agregar al contexto de la historia
```

---

## Usar Personajes en Historias

Después de generar y guardar personajes, puedes usarlos en historias:

**POST /api/stories/chat/init**
```json
{
  "storyTitle": "El Viaje de Pedrito",
  "storyDescription": "Un niño descubre un misterio",
  "userLocality": "Medellín, Colombia",
  "actors": ["Don Carlos", "Pedrito"],
  "sceneCount": 3,
  "wordsPerScene": 120
}
```

Los personajes se incluirán en el contexto de la historia.

---

## ✅ Características

- ✅ Generación de personajes con IA
- ✅ Personalidad y trasfondo cultural
- ✅ Guardado en BD
- ✅ Listado de personajes
- ✅ Integración con historias
