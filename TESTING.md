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
