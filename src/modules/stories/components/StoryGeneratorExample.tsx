"use client";

import { useState } from "react";
import { useStoryGeneration } from "../hooks/useStoryGeneration";
import type { SceneGenerationInput } from "../entities/models/sceneGeneration";

export function StoryGeneratorExample() {
  const {
    generateScenes,
    isGeneratingScenes,
    scenesData,
    scenesError,
    defineWord,
    isDefiningWord,
    wordData,
    wordError,
    generateImage,
    isGeneratingImage,
    imageData,
    imageError,
  } = useStoryGeneration();

  const [selectedWord, setSelectedWord] = useState<string>("");

  const handleGenerateStory = () => {
    const input: SceneGenerationInput = {
      storyTitle: "El Viaje de Pedrito",
      storyDescription: "Un niño descubre un misterio en el mercado local",
      userLocality: "Medellín, Colombia",
      actors: ["Pedrito", "Don Carlos"],
      sceneCount: 2,
      wordsPerScene: 120,
    };
    generateScenes(input);
  };

  const handleDefineWord = (word: string, context: string) => {
    setSelectedWord(word);
    defineWord({ word, context });
  };

  const handleGenerateImage = (sceneNumber: number, content: string) => {
    generateImage({
      sceneContent: content,
      sceneNumber,
      storyTitle: "El Viaje de Pedrito",
      userLocality: "Medellín, Colombia",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generador de Cuentos Interactivos</h1>

      {/* Botón para generar escenas */}
      <button
        onClick={handleGenerateStory}
        disabled={isGeneratingScenes}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isGeneratingScenes ? "Generando..." : "Generar Cuento"}
      </button>

      {scenesError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {scenesError.message}
        </div>
      )}

      {/* Mostrar escenas generadas */}
      {scenesData && (
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold">Escenas Generadas</h2>

          {scenesData.scenes.map((scene) => (
            <div key={scene.scene_number} className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-xl font-semibold mb-2">
                Escena {scene.scene_number}
              </h3>

              {/* Contenido de la escena */}
              <p className="text-gray-700 mb-4">{scene.content}</p>

              {/* Botón para generar imagen */}
              <button
                onClick={() =>
                  handleGenerateImage(scene.scene_number, scene.content)
                }
                disabled={isGeneratingImage}
                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:bg-gray-400 mb-4"
              >
                {isGeneratingImage ? "Generando imagen..." : "Generar Imagen"}
              </button>

              {/* Mostrar imagen generada */}
              {imageData && (
                <div className="mt-3 p-3 bg-blue-50 rounded text-sm">
                  {imageData.base64 && (
                    <img 
                      src={`data:${imageData.mimeType};base64,${imageData.base64}`} 
                      alt={`Escena ${scene.scene_number}`}
                      className="w-full rounded mb-2 max-h-64 object-cover"
                    />
                  )}
                  <p className="font-semibold text-blue-900">Descripción:</p>
                  <p className="text-blue-800 mt-1 text-xs">{imageData.prompt}</p>
                </div>
              )}

              {imageError && (
                <div className="mt-3 p-3 bg-red-50 rounded text-sm text-red-700">
                  Error generando imagen: {imageError.message}
                </div>
              )}

              {/* Opciones de continuación */}
              <div className="mt-4">
                <p className="font-semibold mb-2">¿Qué haces?</p>
                <div className="space-y-2">
                  {scene.options.map((option, idx) => (
                    <button
                      key={idx}
                      className="block w-full text-left px-3 py-2 bg-white border rounded hover:bg-gray-100"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Palabras interactivas */}
              <div className="mt-4 p-3 bg-yellow-50 rounded">
                <p className="text-sm font-semibold text-yellow-900 mb-2">
                  Haz click en una palabra para saber su significado:
                </p>
                <div className="flex flex-wrap gap-2">
                  {scene.content.split(" ").slice(0, 10).map((word, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleDefineWord(word.replace(/[.,!?]/g, ""), scene.content)
                      }
                      className="px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300 text-sm"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para definición de palabra */}
      {wordData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <h3 className="text-2xl font-bold mb-4">{wordData.word}</h3>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-gray-700">Definición:</p>
                <p className="text-gray-600">{wordData.definition}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">Ejemplo:</p>
                <p className="text-gray-600">{wordData.example}</p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">En este contexto:</p>
                <p className="text-gray-600">{wordData.contextRelevance}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedWord("")}
              className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {wordError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error definiendo palabra: {wordError.message}
        </div>
      )}

      {isDefiningWord && (
        <div className="mt-4 p-4 bg-blue-100 text-blue-700 rounded">
          Buscando definición de "{selectedWord}"...
        </div>
      )}
    </div>
  );
}
