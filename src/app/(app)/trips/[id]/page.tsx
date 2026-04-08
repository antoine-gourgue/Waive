import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DeleteTripButton } from "@/components/trips/delete-trip-button";
import type { Trip, AppError } from "@/types";

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id } = await params;
  let trip: Trip | null = null;
  let error: AppError | null = null;

  try {
    const supabase = await createClient();
    const { data, error: dbError } = await supabase
      .from("trips")
      .select("*")
      .eq("id", id)
      .single();

    if (dbError) {
      if (dbError.code === "PGRST116") {
        notFound();
      }
      error = { message: dbError.message, code: dbError.code };
    } else {
      trip = data as Trip;
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to load trip";
    error = { message };
  }

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error.message}
        </div>
      </div>
    );
  }

  if (!trip) {
    notFound();
  }

  const startDate = new Date(trip.start_date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const endDate = trip.end_date
    ? new Date(trip.end_date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {trip.title}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {trip.destination}
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/trips/${trip.id}/edit`}
            className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Edit
          </Link>
          <DeleteTripButton tripId={trip.id} />
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground">
              {startDate}
              {endDate && ` — ${endDate}`}
            </p>
          </CardContent>
        </Card>

        {trip.description && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Description
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground">{trip.description}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
