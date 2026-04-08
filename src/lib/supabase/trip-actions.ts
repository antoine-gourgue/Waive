"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { createTripSchema, updateTripSchema } from "@/lib/schemas/trips";
import type { AppError } from "@/types";

interface ActionResult {
  error: AppError | null;
}

export async function createTrip(formData: FormData): Promise<ActionResult> {
  const raw = {
    title: formData.get("title"),
    description: formData.get("description") || undefined,
    destination: formData.get("destination"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date") || undefined,
  };

  const parsed = createTripSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: {
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      },
    };
  }

  let tripId: string | undefined;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { error: { message: "Not authenticated" } };
    }

    const { data, error } = await supabase
      .from("trips")
      .insert({ ...parsed.data, user_id: user.id })
      .select("id")
      .single();

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }

    tripId = data.id;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to create trip";
    return { error: { message } };
  }

  redirect(`/trips/${tripId}`);
}

export async function updateTrip(
  tripId: string,
  formData: FormData
): Promise<ActionResult> {
  const raw = {
    title: formData.get("title") || undefined,
    description: formData.get("description") || undefined,
    destination: formData.get("destination") || undefined,
    start_date: formData.get("start_date") || undefined,
    end_date: formData.get("end_date") || undefined,
  };

  const parsed = updateTripSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      error: {
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      },
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("trips")
      .update(parsed.data)
      .eq("id", tripId);

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to update trip";
    return { error: { message } };
  }

  revalidatePath(`/trips/${tripId}`);
  redirect(`/trips/${tripId}`);
}

export async function deleteTrip(tripId: string): Promise<ActionResult> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("trips").delete().eq("id", tripId);

    if (error) {
      return { error: { message: error.message, code: error.code } };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to delete trip";
    return { error: { message } };
  }

  revalidatePath("/trips");
  redirect("/trips");
}
