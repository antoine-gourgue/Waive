"use client";

import { deleteTrip } from "@/lib/supabase/trip-actions";
import { Button } from "@/components/ui/button";

interface DeleteTripButtonProps {
  tripId: string;
}

export function DeleteTripButton({ tripId }: DeleteTripButtonProps) {
  return (
    <form
      action={async () => {
        if (window.confirm("Are you sure you want to delete this trip?")) {
          await deleteTrip(tripId);
        }
      }}
    >
      <Button type="submit" variant="destructive">
        Delete
      </Button>
    </form>
  );
}
