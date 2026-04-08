"use client";

import { updateTrip } from "@/lib/supabase/trip-actions";
import { TripForm } from "@/components/trips/trip-form";
import type { Trip } from "@/types";

interface EditTripFormProps {
  trip: Trip;
}

export function EditTripForm({ trip }: EditTripFormProps) {
  const action = async (formData: FormData) => {
    return await updateTrip(trip.id, formData);
  };

  return <TripForm trip={trip} action={action} submitLabel="Save changes" />;
}
