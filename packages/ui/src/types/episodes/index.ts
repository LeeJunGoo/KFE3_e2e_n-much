import type { Database } from '../supabase';

//supabase type
export type EpisodeRow = Database['public']['Tables']['episodes']['Row'];
export type EpisodeInsert = Database['public']['Tables']['episodes']['Insert'];
export type EpisodeUpdate = Database['public']['Tables']['episodes']['Update'];
