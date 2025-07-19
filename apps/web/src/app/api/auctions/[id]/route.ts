//FIXME - type 하드 코딩 수정하기 (KMH)
//FIXME - status 하드 코딩 수정하기 (KMH)

import { NextResponse } from 'next/server';
import {
  deleteAuction,
  selectAuction,
  selectAuctionInfoForEpisode,
  updateAuction
} from 'src/entities/auction/supabase';
import { selectHighestBidder } from 'src/entities/episode/supabase';
import type { NextRequest } from 'next/server';
import type { AuctionUpdate } from 'src/shared/supabase/types';

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
      res = await selectAuction(id);
    } else if (type === 'episode_form') {
      res = await selectAuctionInfoForEpisode(id);
    } else if (type === 'auction') {
      res = await selectHighestBidder(id);
    }

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auctionData: AuctionUpdate = await request.json();

  try {
    const res = await updateAuction(auctionData.auction_id, auctionData);
    return NextResponse.json({ status: 'success', data: res }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { auction_id: auctionId } = await request.json();

  if (!auctionId) {
    return NextResponse.json({ status: 'error', message: 'auction_id 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuction(auctionId);
    return NextResponse.json({ status: 'success', data: res }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
  }
}
