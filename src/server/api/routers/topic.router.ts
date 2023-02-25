import { type Topic } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const topic_router = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const user_topics: Topic[] = await ctx.prisma.topic.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });

    return {
      user_topics: user_topics,
    };
  }),
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Type at least one word" }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
});

export type TopicRouter = typeof topic_router;
