import { type inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { type Express } from "express";
import superjson from "superjson";
import { expressHandler } from "trpc-playground/handlers/express";
import { type TrpcRouter } from "../router";
// import { type ExpressRequest } from "../utils/types";
import { type AppContext } from "./ctx";
import { ExpectedError } from "./error";

export const getTrpcContext = ({
  appContext,
  // req,
}: {
  appContext: AppContext;
  // req: ExpressRequest;
}) => ({
  ...appContext,
  // me: req.user || null,
});

const getCreateTrpcContext =
  (appContext: AppContext) =>
  ({ req }: trpcExpress.CreateExpressContextOptions) =>
    getTrpcContext({ appContext });

type TrpcContext = inferAsyncReturnType<
  ReturnType<typeof getCreateTrpcContext>
>;

export const trpc = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => {
    const isExpected = error.cause instanceof ExpectedError;
    return {
      ...shape,
      data: {
        ...shape.data,
        isExpected,
      },
    };
  },
});

export const createTrpcRouter = trpc.router;

export const applyTrpcToExpressApp = async (
  expressApp: Express,
  appContext: AppContext,
  trpcRouter: TrpcRouter
) => {
  expressApp.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: trpcRouter,
      createContext: getCreateTrpcContext(appContext),
    })
  );

  expressApp.use(
    "/trpc-playground",
    await expressHandler({
      trpcApiEndpoint: "/trpc",
      playgroundEndpoint: "/trpc-playground",
      router: trpcRouter,
      request: {
        superjson: true,
      },
    })
  );
};
