"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());
  // This will fetch the agents data using the TRPC query

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState title="Loading agents..." description="Please wait..." />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Error"
      description="Something went wrong while fetching agents."
    />
  );
};
