import { exampleRouter } from "@/server/api/routers/example";
import { createTRPCRouter } from "@/server/api/trpc";
import { note_router } from "./routers/notes.router";
import { topic_router } from "./routers/topic.router";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  topic: topic_router,
  note: note_router,
});

export type AppRouter = typeof appRouter;
