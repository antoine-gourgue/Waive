import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { EditTripForm } from "@/components/trips/edit-trip-form";
import type { Trip } from "@/types";

interface EditTripPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTripPage({ params }: EditTripPageProps) {
  const { id } = await params;

  let trip: Trip | null = null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      notFound();
    }

    trip = data as Trip;
  } catch {
    notFound();
  }

  if (!trip) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">Edit trip</h1>
      <p className="mt-1 text-sm text-muted-foreground">{trip.title}</p>
      <div className="mt-8">
        <EditTripForm trip={trip} />
      </div>
    </div>
  );
}
