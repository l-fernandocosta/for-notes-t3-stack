import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const note_router = createTRPCRouter({
  get: protectedProcedure
    .input(
      z.object({
        topicId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.session.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Usuário sem permissões",
        });
      }

      const notes = await ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });

      return notes;
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        topicId: z.string().cuid(),
        content: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          content: input.content,
          title: input.title,
          topicId: input.topicId,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
