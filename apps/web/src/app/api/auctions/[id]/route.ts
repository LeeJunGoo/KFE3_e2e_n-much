//FIXME - type 하드 코딩 수정하기 (KMH)
//FIXME - status 하드 코딩 수정하기 (KMH)

import { NextResponse } from 'next/server';
import { selectAuctionWithAddress, selectSellerAuctionCount } from 'src/entities/auction/supabase';
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

  try {
    if (type === 'auction_form') {
      res = await selectAuctionWithAddress(id);
    } else if (type === 'episode_form') {
      res = await selectSellerAuctionCount(id);
    } else if (type === 'auction_detail') {
      res = await selectHighestBidder(id);
    } else {
      return NextResponse.json({ message: '잘못된 정보를 전달하였습니다.', id, type }, { status: 400 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
