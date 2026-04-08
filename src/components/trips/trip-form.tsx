"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Trip, AppError } from "@/types";

interface TripFormProps {
  trip?: Trip;
  action: (formData: FormData) => Promise<{ error: AppError | null }>;
  submitLabel: string;
}

interface FormState {
  error: AppError | null;
}

export function TripForm({ trip, action, submitLabel }: TripFormProps) {
  const [state, formAction, isPending] = useActionState(
    async (_prev: FormState, formData: FormData) => {
      return await action(formData);
    },
    { error: null }
  );

  return (
    <form action={formAction} className="space-y-5">
      <Input
        label="Title"
        name="title"
        defaultValue={trip?.title}
        placeholder="e.g. Japan Spring 2026"
        required
      />
      <Input
        label="Destination"
        name="destination"
        defaultValue={trip?.destination}
        placeholder="e.g. Tokyo, Japan"
        required
      />
      <Input
        label="Description"
        name="description"
        defaultValue={trip?.description ?? ""}
        placeholder="A short description of your trip"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Start date"
          name="start_date"
          type="date"
          defaultValue={trip?.start_date}
          required
        />
        <Input
          label="End date"
          name="end_date"
          type="date"
          defaultValue={trip?.end_date ?? ""}
        />
      </div>

      {state.error && (
        <p className="text-sm text-red-600">{state.error.message}</p>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
