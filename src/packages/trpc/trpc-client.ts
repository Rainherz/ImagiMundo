import { createTRPCContext } from "@trpc/tanstack-react-query";
import { AppRouter } from "./app";
export const { TRPCProvider, useTRPC, useTRPCClient } =
    createTRPCContext<AppRouter>();
