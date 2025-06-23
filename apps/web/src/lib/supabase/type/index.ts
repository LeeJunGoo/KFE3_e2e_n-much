import { Database } from 'src/types/supabase';

//NOTE - supabase Auction type
export type AuctionRow = Database['public']['Tables']['auctions']['Row']; // 데이터 조회(GET)
export type AuctionInsert = Database['public']['Tables']['auctions']['Insert']; // 데이터 추가(POST)
export type AuctionUpdate = Database['public']['Tables']['auctions']['Update']; // 데이터 수정(PATCH)
export type AuctionStatus = AuctionInsert['status'];

//NOTE - supabase Episode type
export type EpisodeRow = Database['public']['Tables']['episodes']['Row']; // 데이터 조회(GET)
export type EpisodeInsert = Database['public']['Tables']['episodes']['Insert']; // 데이터 추가(POST)
export type EpisodeUpdate = Database['public']['Tables']['episodes']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase User type
export type UserRow = Database['public']['Tables']['users']['Row']; // 데이터 조회(GET)
export type UserInsert = Database['public']['Tables']['users']['Insert']; // 데이터 추가(POST)
export type UserUpdate = Database['public']['Tables']['users']['Update']; // 데이터 수정(PATCH)
export type UserRole = UserInsert['role'];
