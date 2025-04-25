import { z } from "zod";

export const zUpdateTaskTrpcInput = z.object({
  id: z.string().min(1, "Title is required."),
  completed: z.boolean({
    required_error: `Boolean flag "completed" is required.`,
  }),
});
