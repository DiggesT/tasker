import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { createTrpcRouter } from "../lib/trpc";
import { createTaskTrpcRoute } from "./task/createTask";
import { getTaskTrpcRoute } from "./task/getTask";
import { getTasksTrpcRoute } from "./task/getTasks";
import { updateTaskTrpcRoute } from "./task/updateTask";

export const trpcRouter = createTrpcRouter({
  createTask: createTaskTrpcRoute,
  getTask: getTaskTrpcRoute,
  getTasks: getTasksTrpcRoute,
  updateTask: updateTaskTrpcRoute,
});

export type TrpcRouter = typeof trpcRouter;
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>;
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>;
