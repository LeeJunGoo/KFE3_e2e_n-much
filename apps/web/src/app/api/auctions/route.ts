//FIXME - status 하드 코딩 수정하기
//NOTE - status 빼는 것 의논해보기, 만약 뺀다면 DB 데이터만 보내도 좋을 것 같음

import { NextResponse } from 'next/server';
import { getAllAuctions, selectAuction, getSellerAuctions, insertAuction } from 'src/entities/auction/supabase';
import { createServer } from 'src/shared/supabase/client/server';
import type { NextRequest } from 'next/server';
import type { AuctionInsert } from 'src/shared/supabase/types';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const auctionId = searchParams.get('auction_id');
  const type = searchParams.get('type');

  try {
    // 특정 경매 조회
    if (auctionId) {
      const res = await selectAuction(auctionId);
      return NextResponse.json({ status: 'success', data: res });
    }

    // 셀러 경매 목록 조회
    if (type === 'sellerAuctions') {
      const supabase = await createServer();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다');
      }
      const res = await getSellerAuctions(user.id);
      return NextResponse.json({ status: 'success', data: res });
    }

    // 전체 경매 조회
    const res = await getAllAuctions();
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}

//TODO - 분리하기 (KMH)
const postAuctionSchema = z.object({
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
  end_date: z.string(),
  starting_point: z.number(),
  max_point: z.number(),
  image_urls: z.array(z.string()),
  address_id: z.string()
});

export async function POST(request: NextRequest) {
  const auctionData: AuctionInsert = await request.json();
  const schemaResult = postAuctionSchema.safeParse(auctionData);

  if (!schemaResult.success) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await insertAuction(auctionData);
    return NextResponse.json(res, { status: 201 }); //TODO - res를 반환할지 다른 것을 반환할지 고려하기 (KMH)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
