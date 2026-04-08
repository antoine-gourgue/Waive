"use client";

import { createTrip } from "@/lib/supabase/trip-actions";
import { TripForm } from "@/components/trips/trip-form";

export default function NewTripPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">New trip</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Plan your next adventure
      </p>
      <div className="mt-8">
        <TripForm action={createTrip} submitLabel="Create trip" />
      </div>
    </div>
  );
}
