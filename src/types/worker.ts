export interface Worker {
  id: string;
  name: string;
  avatar_url: string | null;
  rating: number;
  completed_jobs: number;
  verified: boolean;
  specialties: string[];
  location_text: string;
  active: boolean;
  joined_at: string;
  response_rate: number;
  completion_rate: number;
}
