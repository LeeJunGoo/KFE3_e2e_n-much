import { NextResponse } from 'next/server';
import { selectAuctionInfoForEpisode, selectAuctionWithSellerInfo } from 'src/entities/auction/supabase';
import { selectHighestBidder } from 'src/entities/episode/supabase';
import type { NextRequest } from 'next/server';

type ParamsType = {
  params: Promise<{ id: string }>;
};

// auction_form
// episode_form
// auction_detail

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  let res;

  try {
    if (type === 'auction_form') {
      res = await selectAuctionWithSellerInfo(id);
    } else if (type === 'episode_form') {
      res = await selectAuctionInfoForEpisode(id);
    } else if (type === 'auction') {
      res = await selectHighestBidder(id);
    } else {
      return NextResponse.json(
        { status: 'error', message: '잘못된 정보를 전달하였습니다.', id, type },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}
