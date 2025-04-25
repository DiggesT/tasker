import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zGetTasksTrpcInput } from "./input";

export const getTasksTrpcRoute = trpc.procedure
  .input(
    zGetTasksTrpcInput.extend({
      orderCreatedAt: z.enum(["asc", "desc"]).optional().default("asc"),
    }),
  )
  .query(async ({ ctx, input }) => {
    const tasks = await ctx.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        completed: true,
        serialNumber: true,
      },
      orderBy: [
        {
          createdAt: input.orderCreatedAt,
        },
        {
          serialNumber: "desc",
        },
      ],
      cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
      take: input.limit + 1,
    });

    const nextTask = tasks.at(input.limit);
    const nextCursor = nextTask?.serialNumber;

    return { tasks: tasks.slice(0, input.limit), nextCursor };
  });
