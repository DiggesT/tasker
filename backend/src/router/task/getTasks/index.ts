import { z } from "zod";
import { trpc } from "../../../lib/trpc";
import { zGetMembersTrpcInput } from "./input";

export const getTasksTrpcRoute = trpc.procedure
  .input(
    zGetMembersTrpcInput.extend({
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

    const nextMember = tasks.at(input.limit);
    const nextCursor = nextMember?.serialNumber;

    return { members: tasks.slice(0, input.limit), nextCursor };
  });
