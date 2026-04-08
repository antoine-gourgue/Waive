import { createClient } from "@/lib/supabase/server";
import type { Trip } from "@/types";
import type { AppError } from "@/types";

interface TripCardProps {
  trip: Trip;
}

function TripCard({ trip }: TripCardProps) {
  const startDate = new Date(trip.start_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <a
      href={`/trips/${trip.id}`}
      className="group block rounded-lg border border-border p-5 transition-colors hover:border-accent/30 hover:bg-muted/50"
    >
      <h3 className="font-medium text-foreground group-hover:text-accent">
        {trip.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{trip.destination}</p>
      <p className="mt-3 text-xs text-muted-foreground">{startDate}</p>
    </a>
  );
}

export default async function TripsPage() {
  let trips: Trip[] = [];
  let error: AppError | null = null;

  try {
    const supabase = await createClient();
    const { data, error: dbError } = await supabase
      .from("trips")
      .select("*")
      .order("start_date", { ascending: false });

    if (dbError) {
      error = { message: dbError.message, code: dbError.code };
    } else {
      trips = (data ?? []) as Trip[];
    }
  } catch (e) {
    const message =
      e instanceof Error ? e.message : "Failed to load trips";
    error = { message };
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Trips</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your upcoming and past adventures
          </p>
        </div>
      </div>

      {error ? (
        <div className="mt-10 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error.message}
        </div>
      ) : trips.length === 0 ? (
        <div className="mt-20 text-center">
          <p className="text-muted-foreground">No trips yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first trip to get started.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </div>
  );
}
