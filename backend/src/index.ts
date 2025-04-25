import cors from "cors";
import express from "express";
import { type AppContext, createAppContext } from "./lib/ctx";
import { applyTrpcToExpressApp } from "./lib/trpc";
import { trpcRouter } from "./router";

let ctx: AppContext | null = null;

void (async () => {
  try {
    ctx = createAppContext();

    const expressApp = express();
    expressApp.use(cors());
    expressApp.get("/ping", (req, res) => {
      res.send("pong");
    });

    await applyTrpcToExpressApp(expressApp, ctx, trpcRouter);

    expressApp.use(
      (
        error: unknown,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction,
      ) => {
        if (res.headersSent) {
          next(error);
          return;
        }
        res.status(500).send("Internal server error");
      },
    );

    expressApp.listen(3000, () => {
      console.info("express", `Listening at http://localhost:3000`);
    });
  } catch (error) {
    await ctx?.stop();
  }
})();
