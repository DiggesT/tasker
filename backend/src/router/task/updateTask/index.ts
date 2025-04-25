import { trpc } from "../../../lib/trpc";
import { zUpdateTaskTrpcInput } from "./input";

export const updateTaskTrpcRoute = trpc.procedure
  .input(zUpdateTaskTrpcInput)
  .mutation(async ({ ctx, input }) => {
    const { id, completed } = input;

    const task = await ctx.prisma.task.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) {
      throw new Error("Task not found (updateTaskTrpcRoute).");
    }

    await ctx.prisma.task.update({
      where: {
        id: id,
      },
      data: {
        completed,
      },
    });

    return true;
  });
