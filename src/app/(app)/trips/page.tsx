import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Trip, AppError } from "@/types";

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
    <Link href={`/trips/${trip.id}`} className="group">
      <Card className="transition-colors group-hover:ring-primary/30">
        <CardHeader>
          <CardTitle className="group-hover:text-primary">
            {trip.title}
          </CardTitle>
          <CardDescription>{trip.destination}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">{startDate}</p>
        </CardContent>
      </Card>
    </Link>
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
        <Link
          href="/trips/new"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
        >
          New trip
        </Link>
      </div>

      {error ? (
        <div className="mt-10 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
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
