import { PrismaClient } from "@prisma/client";

export const createPrismaClient = () => {
  const prisma = new PrismaClient();

  const extendedPrisma = prisma.$extends({
    query: {
      $allModels: {
        $allOperations: async ({ model, operation, args, query }) => {
          try {
            const result = await query(args);
            return result;
          } catch (error) {
            throw error;
          }
        },
      },
    },
  });

  return extendedPrisma;
};
