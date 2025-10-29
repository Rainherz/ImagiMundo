import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/8bit/dialog";
import { useStories } from "../../queries";
import { toast } from "sonner";
import { defineWord } from "../../features/word-definition/api";
import React from "react";
import { Title } from "@/components/ui/title";

export default function WordDefinitionModal({
  word,
  context,
}: {
  word: string;
  context: string;
}) {
  const { useDefineWord } = useStories();
  const [wordDefinition, setWordDefinition] = React.useState<Awaited<
    ReturnType<typeof defineWord>
  > | null>(null);

  const mutateDefineWord = useDefineWord({
    onError: (error) => toast.error(error.message),
    onSuccess: (data: Awaited<ReturnType<typeof defineWord>>) => {
      setWordDefinition(data);
    },
  });

  return (
    <Dialog>
      <DialogTrigger
        onClick={() => {
          mutateDefineWord.mutate({ word, context });
        }}
      className="cursor-pointer hover:text-primary"
      > 
        {word}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{word.toUpperCase()}</DialogTitle>
          <DialogDescription>
            {wordDefinition ? (
              <p>{wordDefinition.definition}</p>
            ) : (
              <p>Cargando definición...</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <Title size="sm" className="text-primary"> Ejemplo de uso:</Title>
          {wordDefinition ? (
            <p className="font-normal"> {wordDefinition.example}</p>
          ) : (
            <p>Cargando ejemplo...</p>
          )}
          <Title size="sm" className="text-secondary">Relevancia en el contexto:</Title>
          {wordDefinition ? (
            <p>{wordDefinition.contextRelevance}</p>
          ) : (
            <p>Cargando relevancia...</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function getWordContexts(text: string, contextSize = 5) {
  const words = text.split(/\s+/);

  // Recorrer cada palabra y devolver su contexto
  return words.map((word, i) => {
    const start = Math.max(0, i - contextSize);
    const end = Math.min(words.length, i + contextSize + 1);
    const context = words.slice(start, end).join(" ");
    return {
      word,
      index: i,
      context,
    };
  });
}
