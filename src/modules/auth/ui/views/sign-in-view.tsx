"use client";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { set } from "date-fns";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setPending(true);
    setError(null);
    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setError(error.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-8">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-balance text-muted-foreground">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="*********"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="mr-4 h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type="submit" className="w-full">
                  Sign in
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:z-0 after:flex after:items-center">
                  <span className="bg-card text-muted-foreground px-2 relative z-10">
                    Or continue with
                  </span>
                </div>
                <div className="grid gris-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    variant="outline"
                    className="w-full"
                    type="button"
                  >
                    Google
                  </Button>
                  <Button
                    disabled={pending}
                    variant="outline"
                    className="w-full"
                    type="button"
                  >
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm mt-4">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="underline underline-offset-4 hover:text-primary"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>

          <div className="bg-radial from-blue-700 to-blue-900 relative hidden md:flex flex-col items-center justify-center gap-y-4">
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-white">ACTENT</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs *:[a]:underline *:[a]:hover:text-primary *:[a]:underline-offset-4">
        By clicking "Sign in" you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
