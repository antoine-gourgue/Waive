"use client";

import { create } from "zustand";
import type { Trip, AppError } from "@/types";

interface TripsState {
  trips: Trip[];
  isLoading: boolean;
  error: AppError | null;
  setTrips: (trips: Trip[]) => void;
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
  removeTrip: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: AppError | null) => void;
}

export const useTripsStore = create<TripsState>((set) => ({
  trips: [],
  isLoading: false,
  error: null,
  setTrips: (trips) => set({ trips }),
  addTrip: (trip) => set((state) => ({ trips: [...state.trips, trip] })),
  updateTrip: (id, updates) =>
    set((state) => ({
      trips: state.trips.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    })),
  removeTrip: (id) =>
    set((state) => ({ trips: state.trips.filter((t) => t.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
