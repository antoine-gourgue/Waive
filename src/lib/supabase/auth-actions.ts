"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { loginSchema, registerSchema } from "@/lib/schemas/auth";
import type { AppError } from "@/types";

interface AuthResult {
  error: AppError | null;
}

export async function login(formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: {
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      },
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Login failed";
    return { error: { message } };
  }

  redirect("/trips");
}

export async function register(formData: FormData): Promise<AuthResult> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: {
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      },
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Registration failed";
    return { error: { message } };
  }

  redirect("/trips");
}

export async function logout(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    /** Sign out failed silently — redirect anyway */
  }

  redirect("/login");
}
