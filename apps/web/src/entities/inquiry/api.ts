import type { InquiryCreateType, InquiryEditType } from 'src/entities/inquiry/types';

//NOTE -  - 문의 등록
export const postInquiryInfo = async ({ auctionId, userId, title, description }: InquiryCreateType) => {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiry`, {
  //   headers: { 'Content-Type': 'application/json' },
  //   method: 'POST',
  //   body: JSON.stringify({
  //     auctionId,
  //     userId,
  //     title,
  //     description
  //   })
  // });

  // if (!res.ok) {
  //   const errorResponse = await res.json();
  //   throw new Error(errorResponse.error);
  // }

  // const status = await res.json();
  // return status.message;
  return 'success';
};

//NOTE -  - 문의 수정
export const patchInquiryInfo = async ({ inquiryId, title, description }: InquiryEditType) => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/inquiry?type=updateInquiry`, {
  //   headers: { 'Content-Type': 'application/json' },
  //   method: 'PATCH',
  //   body: JSON.stringify({
  //     inquiryId,
  //     title,
  //     description
  //   })
  // });

  // if (!res.ok) {
  //   const errorResponse = await res.json();
  //   throw new Error(errorResponse.error);
  // }

  // const status = await res.json();
  // return status.message;
  return 'success';
};
