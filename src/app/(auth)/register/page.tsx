"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/supabase/auth-actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { AppError } from "@/types";

interface RegisterState {
  error: AppError | null;
}

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: RegisterState, formData: FormData) => {
      return await register(formData);
    },
    { error: null }
  );

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start organizing your travels with Waive
          </p>
        </div>

        <form action={formAction} className="space-y-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
          />
          <Input
            label="Confirm password"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
          />

          {state.error && (
            <p className="text-sm text-red-600">{state.error.message}</p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Creating account..." : "Create account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
