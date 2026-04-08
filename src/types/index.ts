export interface Trip {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  destination: string;
  cover_url?: string;
  start_date: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface TripDocument {
  id: string;
  trip_id: string;
  user_id: string;
  name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface TripNote {
  id: string;
  trip_id: string;
  user_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface TripPhoto {
  id: string;
  trip_id: string;
  user_id: string;
  url: string;
  caption?: string;
  taken_at?: string;
  created_at: string;
}

export interface TripPlace {
  id: string;
  trip_id: string;
  user_id: string;
  name: string;
  address?: string;
  latitude: number;
  longitude: number;
  category?: string;
  notes?: string;
  created_at: string;
}

export interface AppError {
  message: string;
  code?: string;
  status?: number;
}
