import { describe, it, expect, beforeEach } from "vitest";
import { useTripsStore } from "./trips-store";
import type { Trip } from "@/types";

const makeTip = (overrides: Partial<Trip> = {}): Trip => ({
  id: "1",
  user_id: "user-1",
  title: "Japan",
  destination: "Tokyo",
  start_date: "2026-05-01",
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
  ...overrides,
});

describe("useTripsStore", () => {
  beforeEach(() => {
    useTripsStore.setState({
      trips: [],
      isLoading: false,
      error: null,
    });
  });

  it("starts with empty state", () => {
    const state = useTripsStore.getState();
    expect(state.trips).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("sets trips", () => {
    const trips = [makeTip(), makeTip({ id: "2", title: "France" })];
    useTripsStore.getState().setTrips(trips);
    expect(useTripsStore.getState().trips).toEqual(trips);
  });

  it("adds a trip", () => {
    const trip = makeTip();
    useTripsStore.getState().addTrip(trip);
    expect(useTripsStore.getState().trips).toHaveLength(1);
    expect(useTripsStore.getState().trips[0]).toEqual(trip);
  });

  it("updates a trip", () => {
    useTripsStore.getState().setTrips([makeTip()]);
    useTripsStore.getState().updateTrip("1", { title: "Updated Japan" });
    expect(useTripsStore.getState().trips[0]?.title).toBe("Updated Japan");
  });

  it("does not update non-existent trip", () => {
    useTripsStore.getState().setTrips([makeTip()]);
    useTripsStore.getState().updateTrip("999", { title: "Nope" });
    expect(useTripsStore.getState().trips[0]?.title).toBe("Japan");
  });

  it("removes a trip", () => {
    useTripsStore.getState().setTrips([makeTip(), makeTip({ id: "2" })]);
    useTripsStore.getState().removeTrip("1");
    expect(useTripsStore.getState().trips).toHaveLength(1);
    expect(useTripsStore.getState().trips[0]?.id).toBe("2");
  });

  it("sets loading state", () => {
    useTripsStore.getState().setLoading(true);
    expect(useTripsStore.getState().isLoading).toBe(true);
  });

  it("sets error", () => {
    const error = { message: "Something went wrong" };
    useTripsStore.getState().setError(error);
    expect(useTripsStore.getState().error).toEqual(error);
  });

  it("clears error", () => {
    useTripsStore.getState().setError({ message: "err" });
    useTripsStore.getState().setError(null);
    expect(useTripsStore.getState().error).toBeNull();
  });
});
