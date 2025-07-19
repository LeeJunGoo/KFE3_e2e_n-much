import type { Database } from 'src/shared/supabase/types/supabase';

//NOTE - supabase Auction type
export type AuctionRow = Database['public']['Tables']['auctions']['Row']; // 데이터 조회(GET)
export type AuctionInsert = Database['public']['Tables']['auctions']['Insert']; // 데이터 추가(POST)
export type AuctionUpdate = Database['public']['Tables']['auctions']['Update']; // 데이터 수정(PATCH)
export type AuctionStatus = AuctionInsert['status'];

//NOTE - supabase Episode type
export type EpisodeRow = Database['public']['Tables']['episodes']['Row']; // 데이터 조회(GET)
export type EpisodeInsert = Database['public']['Tables']['episodes']['Insert']; // 데이터 추가(POST)
export type EpisodeUpdate = Database['public']['Tables']['episodes']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase Point type
export type PointRow = Database['public']['Tables']['points']['Row'];

//NOTE - supabase Keyword type
export type KeywordRow = Database['public']['Tables']['keywords']['Row']; // 데이터 조회(GET)
export type KeywordInsert = Database['public']['Tables']['keywords']['Insert']; // 데이터 추가(POST)
export type KeywordUpdate = Database['public']['Tables']['keywords']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase Address type
export type AddressRow = Database['public']['Tables']['addresses']['Row']; // 데이터 조회(GET)
export type AddressInsert = Database['public']['Tables']['addresses']['Insert']; // 데이터 추가(POST)
export type AddressUpdate = Database['public']['Tables']['addresses']['Update']; // 데이터 수정(PATCH)
