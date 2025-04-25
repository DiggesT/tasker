import { type Task } from "@prisma/client";
import { type Request } from "express";

export type ExpressRequest = Request & {
  user: Task | undefined;
};
