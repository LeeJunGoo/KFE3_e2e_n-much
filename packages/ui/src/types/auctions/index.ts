import type { Database } from '../supabase';

//supabase type
export type AuctionRow = Database['public']['Tables']['auctions']['Row'];
export type AuctionInsert = Database['public']['Tables']['auctions']['Insert'];
export type AuctionUpdate = Database['public']['Tables']['auctions']['Update'];
export type AuctionStatus = AuctionInsert['status'];


export type CreateAuctionPayload = Pick<
  AuctionInsert,
  | 'user_id'
  | 'title'
  | 'description'
  | 'starting_point'
  | 'current_point'
  | 'max_point'
  | 'status'
  | 'image_urls'
  | 'start_time'
  | 'end_time'
>;
