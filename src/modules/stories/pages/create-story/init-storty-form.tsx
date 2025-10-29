"use client";

import * as React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/8bit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/8bit/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/8bit/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useStories } from "../../queries";
import { XIcon } from "lucide-react";
import { initializeStory } from "../../features/scene-generation/chat";

const formSchema = z.object({
  storyTitle: z.string().min(5, "El titulo debe tener al menos 5 caracteres"),
  storyDescription: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres"),
  userLocality: z
    .string()
    .min(5, "La localidad debe tener al menos 5 caracteres"),
  actors: z
    .array(
      z.object({
        name: z.string(),
      })
    )
    .min(1, "Se requiere al menos un actor"),
  sceneCount: z.string().refine((val) => {
    const number = parseInt(val, 10);
    return number >= 1 && number <= 3;
  }, "El número de escenas debe estar entre 1 y 3"),
  wordsPerScene: z.string().refine((val) => {
    const number = parseInt(val, 10);
    return number >= 50 && number <= 500;
  }, "Las palabras por escena deben estar entre 50 y 500"),
});

export function CreateHistoryForm({
  setInitStoryResponse,
}: {
  setInitStoryResponse: React.Dispatch<
    React.SetStateAction<
      | (Awaited<ReturnType<typeof initializeStory>> & {
          storyTitle: string;
          userLocality: string;
        })
      | null
    >
  >;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storyTitle: "",
      storyDescription: "",
      userLocality: "",
      actors: [{ name: "" }],
      sceneCount: "3",
      wordsPerScene: "150",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "actors",
  });

  const { useInitStory } = useStories();

  const initStory = useInitStory({
    onError: (error) => toast.error(error.message),
    onSuccess: (data: Awaited<ReturnType<typeof initializeStory>>) => {
      setInitStoryResponse({
        ...data,
        storyTitle: form.getValues("storyTitle"),
        userLocality: form.getValues("userLocality"),
      });
      form.reset();
      toast.success("Estas iniciando una nueva historia!");
      console.log("Historia iniciada:", data);
    },
  });

  function onSubmit(input: z.input<typeof formSchema>) {
    initStory.mutate({
      ...input,
      actors: input.actors.map((actor) => actor.name),
      sceneCount: parseInt(input.sceneCount, 10),
      wordsPerScene: parseInt(input.wordsPerScene, 10),
    });
  }

  return (
    <Card className="w-full opacity-90 sm:max-w-4xl">
      <CardHeader>
        <CardTitle>Iniciar Historia</CardTitle>
        <CardDescription>
          Completa el formulario para crear una nueva historia.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-init-story" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="storyTitle"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-story-title">
                    Título de la Historia
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-story-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ejemplo: La aventura en el bosque encantado"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="userLocality"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-user-locality">
                    Localidad del Usuario
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-user-locality"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ejemplo: Arequipa, Perú"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="storyDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-story-description">
                    Descripción de la Historia
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      id="form-rhf-story-description"
                      placeholder="Describe brevemente de qué trata la historia."
                      rows={6}
                      className="min-h-24 resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                  </InputGroup>
                  <FieldDescription>
                    Incluye una breve sinopsis de la historia que deseas crear.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                name={`actors.${index}.name`}
                control={form.control}
                render={({ field: controllerField, fieldState }) => (
                  <Field
                    orientation="horizontal"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldLabel htmlFor={`form-rhf-actor-name-${index}`}>
                        Nombre del Personaje
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          {...controllerField}
                          id={`form-rhf-actor-name-${index}`}
                          aria-invalid={fieldState.invalid}
                          placeholder="Ejemplo: Juanito"
                        />
                        {fields.length > 1 && (
                          <InputGroupAddon align="inline-end">
                            <InputGroupButton
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              onClick={() => remove(index)}
                              aria-label={`Remove email ${index + 1}`}
                            >
                              <XIcon />
                            </InputGroupButton>
                          </InputGroupAddon>
                        )}
                      </InputGroup>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </FieldContent>
                  </Field>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append({ name: "" })}
              disabled={fields.length >= 5}
            >
              Agregar personaje
            </Button>
            {/* <Controller
              name="sceneCount"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-scene-count">
                    Número de Escenas
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-scene-count"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="Ejemplo: 3"
                    min={1}
                    max={3}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="wordsPerScene"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-words-per-scene">
                    Palabras por Escena
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-words-per-scene"
                    aria-invalid={fieldState.invalid}
                    type="number"
                    placeholder="Ejemplo: 150"
                    min={50}
                    max={500}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            /> */}
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Resetear formulario
          </Button>
          <Button type="submit" form="form-init-story">
            Continuar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
