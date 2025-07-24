//TODO - DB 테이블 생성 후 작업 예정
// import type { InquiryInsert, InquiryRow, InquiryUpdate } from 'src/shared/supabase/types/index';
export type InquiryRow = {
  inquiry_id: string;
  auction_id: string;
  user_id: string;
  title: string;
  description: string;
};

type InquiryInsert = {
  inquiry_id?: string;
  auction_id: string;
  user_id: string;
  title: string;
  description: string;
};

type InquiryUpdate = {
  inquiry_id?: string;
  auction_id?: string;
  user_id?: string;
  title: string;
  description: string;
};

//NOTE -  - 문의 등록
export type InquiryCreateType = {
  auctionId: InquiryInsert['auction_id'];
  userId: InquiryInsert['user_id'];
  title: InquiryInsert['title'];
  description: InquiryInsert['description'];
};

//NOTE - 문의 수정
export type InquiryEditType = {
  inquiryId: InquiryUpdate['inquiry_id'];
  title: InquiryUpdate['title'];
  description: InquiryUpdate['description'];
};
