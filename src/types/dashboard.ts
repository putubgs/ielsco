// Dashboard Types
export type MembershipTier = 'basic' | 'pro';

export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  user_id_code?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  avatar_url?: string;
  bio?: string;
  occupation?: string;
  english_level?: string;
  institution?: string;
  batch?: string;
  interests?: string[];
  goals?: string;
}

export interface Membership {
  id: string;
  user_id: string;
  tier: MembershipTier;
  start_date: string;
  end_date?: string;
  status: 'active' | 'expired' | 'cancelled';
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description?: string;
  event_date?: string;
  type?: string;
  banner_url?: string;
}

export interface EventRegistration {
  id: string;
  event_id: string;
  user_id: string;
  attended?: boolean;
  created_at: string;
  event: Event;
}

export interface Contribution {
  id: string;
  user_id: string;
  project_name: string;
  role: string;
  description: string;
  output_links?: string[];
  date: string;
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'scholarship' | 'internship' | 'leadership' | 'program';
  organization: string;
  description: string;
  deadline?: string;
  link: string;
  requirements?: string;
  created_at: string;
}

export interface TrustIndicators {
  attendance_rate: number; // 0-100
  consistency_score: number; // days active in last 30
  contribution_frequency: number; // contributions per month
  reliability_score: number; // 0-100
}

export interface DashboardStats {
  events_attended: number;
  total_contributions: number;
  hours_logged: number;
  trust_indicators: TrustIndicators;
}