import { AgentGetOne } from "../../types";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import z from "zod";
import { agentsInsertSchema } from "../../schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

import { GeneratedAvatar } from "@/components/generated-avatar";

import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { error } from "console";
import { toast } from "sonner";



interface AgentFormProps {
  onSuccess?: () => void;
  onCancel: () => void;
  initialValues?: AgentGetOne;
}


export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,

}: AgentFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const trpc = useTRPC();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions(),
        ); 


        if (initialValues?.id) {
          await  queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id }),
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error("Failed to create agent: " + error.message);
      },
    }),
  );

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name || "",
      instructions: initialValues?.instructions || "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const handleSubmit = async (data: z.infer<typeof agentsInsertSchema>) => {
  if (isEdit) {
    console.log("Edit functionality not implemented yet");
    // Optionally add update mutation here
  } else {
    createAgent.mutate(data);
  }
};



return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
      <GeneratedAvatar
        className="w-16 h-16 mb-4"
        variant="botttsNeutral"
        seed={form.watch("name") || "New Agent"}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Agent Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Textarea placeholder="Agent Instructions" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button type="submit" disabled={isPending}>
          {isEdit ? "Update" : "Create"}
        </Button>
        <Button variant="ghost" type="button" disabled={isPending} onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  );
}