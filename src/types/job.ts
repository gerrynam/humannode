export type RequestSource = "AI_AGENT" | "HUMAN_WEB" | "PARTNER_ROUTED";

export type JobStatus = 
  | "POSTED"
  | "CLAIMED"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "APPROVED"
  | "PAID"
  | "CANCELED"
  | "DISPUTED"
  | "REFUNDED"
  | "EXPIRED";

export type RouteDecision = 
  | "POST_TO_HUMAN_NODE"
  | "ROUTE_TO_PARTNER"
  | "NEEDS_ADMIN_REVIEW";

export interface Job {
  id: string;
  title: string;
  description: string;
  request_source: RequestSource;
  created_by_agent_id?: string;
  created_by_user_id?: string;
  category_raw?: string;
  category_final?: string;
  route_decision: RouteDecision;
  location_text: string;
  lat: number;
  lng: number;
  time_start: string;
  time_end: string;
  budget: number;
  currency: string;
  risk_score?: number;
  status: JobStatus;
  created_at: string;
  expires_at?: string;
  distance_km?: number;
  estimated_duration_min?: number;
}
