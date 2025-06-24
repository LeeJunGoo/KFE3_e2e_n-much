import { AuctionRow } from 'src/lib/supabase/type';

//NOTE - 경매 상세페이지 타입 지정
export type AuctionInfoType = { status: string; data: AuctionRow };
