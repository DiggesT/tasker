import type { TrpcRouter } from "@tasker/backend/src/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createTRPCReact,
  httpBatchLink,
  type TRPCLink,
} from "@trpc/react-query";
import { observable } from "@trpc/server/observable";
import superjson from "superjson";

export const trpc = createTRPCReact<TrpcRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const customTrpcLink: TRPCLink<TrpcRouter> = () => {
  return ({ next, op }) => {
    return observable((observer) => {
      const unsubscribe = next(op).subscribe({
        next(value) {
          observer.next(value);
        },
        error(error) {
          observer.error(error);
        },
        complete() {
          observer.complete();
        },
      });
      return unsubscribe;
    });
  };
};

const trpcClient = trpc.createClient({
  transformer: superjson,
  links: [
    customTrpcLink,
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};
