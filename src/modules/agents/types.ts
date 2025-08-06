import { inferRouterOutputs } from "@trpc/server";

import { AppRouter, appRouter } from "@/trpc/routers/_app";
import { AppRoute } from "next/dist/build/swc/types";

export type AgentGetOne = inferRouterOutputs<AppRouter>["agents"]["getOne"];
export type AgentGetMany = inferRouterOutputs<AppRouter>["agents"]["getMany"];