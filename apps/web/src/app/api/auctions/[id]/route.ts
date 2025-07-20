//TODO - '500: 서버 처리 중 오류가 발생했습니다.' 의논해보기 DB에러가 무시됨 (KMH)
import { NextResponse } from 'next/server';
import {
  deleteAuction,
  selectAuction,
  selectAuctionInfoForEpisode,
  updateAuction
} from 'src/entities/auction/supabase';
import { selectHighestBidder } from 'src/entities/episode/supabase';
import { z } from 'zod';
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

//TODO - 분리하기 (KMH)
const patchAuctionSchema = z.object({
  auction_id: z.string(),
  user_id: z.string(),
  title: z.string(),
  description: z.string(),
  end_date: z.string(),
  starting_point: z.number(),
  current_point: z.number(),
  max_point: z.number(),
  image_urls: z.array(z.string()),
  status: z.string(),
  address_id: z.string(),
  updated_at: z.string()
});

export async function PATCH(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const auction: AuctionUpdate = await request.json();
  const schemaResult = patchAuctionSchema.safeParse(auction);

  if (!schemaResult.success || !id) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await updateAuction(id, auction);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { auction_id: auctionId } = await request.json();

  if (!auctionId) {
    return NextResponse.json({ message: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuction(auctionId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
