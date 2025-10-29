import { router, publicProcedure } from "@/packages/trpc";
import { generateActor } from "../generate-actor/api";
import prisma from "@/packages/prisma";
import { ActorGenerationInputSchema } from "../../entities/models/actor";
import { z } from "zod";

const SaveActorSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
});

const ActorsServerRouter = router({
  // Generar un nuevo personaje
  generate: publicProcedure
    .input(ActorGenerationInputSchema)
    .mutation(async ({ input }) => {
      return await generateActor(input);
    }),

  // Listar todos los personajes guardados
  list: publicProcedure.query(async () => {
    return await prisma.actor.findMany({
      select: {
        id: true,
        name: true,
        description: true,
      },
    });
  }),

  // Guardar un personaje en la BD
  save: publicProcedure
    .input(SaveActorSchema)
    .mutation(async ({ input }) => {
      return await prisma.actor.create({
        data: {
          name: input.name,
          description: input.description,
        },
      });
    }),
});

export default ActorsServerRouter;
