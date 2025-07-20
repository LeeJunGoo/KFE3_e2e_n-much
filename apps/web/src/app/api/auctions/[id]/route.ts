import { NextResponse } from 'next/server';
import { selectAuctionSummaryInfoWithAddress, selectAuctionWithSellerInfo } from 'src/entities/auction/supabase';
import { selectHighestBidder } from 'src/entities/episode/supabase';
import type { NextRequest } from 'next/server';

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  let res;

  if (!id || !type) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (type === 'auction_form') {
      res = await selectAuctionWithSellerInfo(id);
    } else if (type === 'episode_form') {
      res = await selectAuctionSummaryInfoWithAddress(id);
    } else if (type === 'auction') {
      res = await selectHighestBidder(id);
    }

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
