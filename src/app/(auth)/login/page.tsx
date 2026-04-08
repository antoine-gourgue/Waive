"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/supabase/auth-actions";
import { FormField } from "@/components/ui/form-field";
import { Button } from "@/components/ui/button";
import type { AppError } from "@/types";

interface LoginState {
  error: AppError | null;
}

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: LoginState, formData: FormData) => {
      return await login(formData);
    },
    { error: null }
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your Waive account
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <FormField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />

          {state.error && (
            <p className="text-sm text-destructive">{state.error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
