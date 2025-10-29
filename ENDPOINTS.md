# 🧪 Testing - Endpoints REST ImagiMundo

**Todos los endpoints disponibles con ejemplos completos**

---

## 📋 Índice de Endpoints

1. **Historias Interactivas** - Chat conversacional
3. **Generación de Imágenes** - Imágenes de escenas
4. **Definición de Palabras** - Palabras del contexto
5. **Generación de Personajes** - Crear personajes con IA
6. **Gestión de Personajes** - Guardar y listar personajes

---

# 1️⃣ HISTORIAS INTERACTIVAS (Chat)

## Endpoints

```
POST /api/stories/chat/init       # Iniciar historia
POST /api/stories/chat/continue   # Continuar historia
```

---

### Test 1.1: Iniciar Historia

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

**⚠️ Guarda el `storyId` para los siguientes requests.**

---

### Test 1.2: Continuar Historia (Escena 2)

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

### Test 1.3: Continuar Historia (Escena 3 - Final)

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
      "content": "Dentro de la caja, Pedrito encontró un mapa antiguo...",
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

**✅ `isComplete: true` = última escena**

---


# 3️⃣ GENERACIÓN DE IMÁGENES

## Endpoint

```
POST /api/stories/images   # Generar imagen de escena
```

---

### Test 3.1: Generar Imagen

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
    "base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "mimeType": "image/png",
    "prompt": "A young boy in traditional Colombian clothing exploring a colorful market..."
  }
}
```

**💡 Usar en HTML:**
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==" />
```

---

# 4️⃣ DEFINICIÓN DE PALABRAS

## Endpoint

```
POST /api/stories/words   # Definir palabra en contexto
```

---

### Test 4.1: Definir Palabra

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

# 5️⃣ GENERACIÓN DE PERSONAJES

## Endpoint

```
POST /api/actors/generate   # Generar personaje con IA
```

---

### Test 5.1: Generar Personaje

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

# 6️⃣ GESTIÓN DE PERSONAJES

## Endpoints

```
POST /api/actors/save   # Guardar personaje en BD
GET  /api/actors/list   # Listar personajes guardados
```

---

### Test 6.1: Guardar Personaje

**URL:**
```
POST http://localhost:3000/api/actors/save
```

**Body:**
```json
{
  "name": "Don Carlos",
  "description": "Un vendedor de frutas exóticas en el mercado que conoce historias antiguas. Amable, sabio, paciente. Descendiente de comerciantes paisa."
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

### Test 6.2: Listar Personajes

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

# 🔄 FLUJOS COMPLETOS

## Flujo 1: Historia Interactiva Completa

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

## Flujo 2: Generar y Usar Personajes

```
1. POST /api/actors/generate
   ↓ IA genera personaje detallado

2. Usuario revisa el personaje
   ↓

3. POST /api/actors/save
   ↓ Guarda en BD

4. GET /api/actors/list
   ↓ Obtiene lista de personajes

5. POST /api/stories/chat/init (con actors)
   ↓ Usa personajes en la historia
```

---

## Flujo 3: Historia + Imagen + Palabra

```
1. POST /api/stories/chat/init
   ↓ Obtiene escena

2. POST /api/stories/images
   ↓ Genera imagen de la escena

3. POST /api/stories/words
   ↓ Define palabra del contexto

4. POST /api/stories/chat/continue
   ↓ Continúa historia
```

---

# ⚠️ ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| 400 Bad Request | JSON inválido | Verifica sintaxis JSON |
| Historia no encontrada | storyId expiró | Inicia nueva historia |
| Timeout | Generación lenta | Reduce sceneCount |
| BD no disponible | Prisma falla | Continúa sin persistencia |

---

# ✅ RESUMEN

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/api/stories/chat/init` | POST | Iniciar historia |
| `/api/stories/chat/continue` | POST | Continuar historia |
| `/api/stories/scenes` | POST | Generar escenas |
| `/api/stories/images` | POST | Generar imagen |
| `/api/stories/words` | POST | Definir palabra |
| `/api/actors/generate` | POST | Generar personaje |
| `/api/actors/save` | POST | Guardar personaje |
| `/api/actors/list` | GET | Listar personajes |

---

**Última actualización: 29 de Octubre, 2025**
