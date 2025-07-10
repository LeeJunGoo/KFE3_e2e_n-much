import { Database } from 'src/shared/supabase/types/supabase';

//NOTE - supabase Auction type
export type AuctionRow = Database['public']['Tables']['auctions']['Row']; // 데이터 조회(GET)
export type AuctionInsert = Database['public']['Tables']['auctions']['Insert']; // 데이터 추가(POST)
export type AuctionUpdate = Database['public']['Tables']['auctions']['Update']; // 데이터 수정(PATCH)
export type AuctionStatus = AuctionInsert['status'];

//NOTE - supabase Episode type
export type EpisodeRow = Database['public']['Tables']['episodes']['Row']; // 데이터 조회(GET)
export type EpisodeInsert = Database['public']['Tables']['episodes']['Insert']; // 데이터 추가(POST)
export type EpisodeUpdate = Database['public']['Tables']['episodes']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase Seller type
export type SellerRow = Database['public']['Tables']['sellers']['Row']; // 데이터 조회(GET)
export type SellerInsert = Database['public']['Tables']['sellers']['Insert']; // 데이터 추가(POST)
export type SellerUpdate = Database['public']['Tables']['sellers']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase Buyer type
export type BuyerRow = Database['public']['Tables']['buyers']['Row']; // 데이터 조회(GET)
export type BuyerInsert = Database['public']['Tables']['buyers']['Insert']; // 데이터 추가(POST)
export type BuyerUpdate = Database['public']['Tables']['buyers']['Update']; // 데이터 수정(PATCH)

//NOTE - supabase Point type
export type PointRow = Database['public']['Tables']['points']['Row'];
