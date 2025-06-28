import { NextRequest, NextResponse } from 'next/server';
<<<<<<< HEAD
import { AuctionInsert } from 'src/lib/supabase/type';
import {
  addAuction,
  deleteAuction,
  getAuction,
  getAuctionsWithEpisodeCountByOrder
=======
import { AuctionInsert, AuctionUpdate } from 'src/lib/supabase/type';
import {
  addAuction,
  deleteAuction,
  getAllAuctions,
  getAuction,
  updateAuction
>>>>>>> 8ba17b50393eebbd4dd277b2d43de897f3e3fe1d
} from '../../../lib/supabase/query/auctions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const auctionId = searchParams.get('auction_id');
  const orderParam = searchParams.get('orderParam');
  const count = searchParams.get('count');
  let res;

  try {
    // 특정 경매 조회
    if (auctionId) {
      res = await getAuction(auctionId);
    }

    // 메인페이지: 마감 임박순, 인기순, 최신순
    if (orderParam === 'favorites' && count) {
      res = await getAuctionsWithEpisodeCountByOrder(orderParam, false, Number(count));
    } else if (orderParam === 'end_time' && count) {
      res = await getAuctionsWithEpisodeCountByOrder(orderParam, true, Number(count));
    } else if (orderParam === 'created_at' && count) {
      res = await getAuctionsWithEpisodeCountByOrder(orderParam, true, Number(count));
    } else {
      return NextResponse.json(
        { status: 'error', message: '잘못된 정보를 전달하였습니다.', orderParam },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auctionData: AuctionInsert = await request.json();

  try {
    const res = await addAuction(auctionData);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const auctionData: AuctionUpdate = await request.json();

  try {
    const res = await updateAuction(auctionData.auction_id, auctionData);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message });
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { auction_id } = await request.json();

  if (!auction_id) {
    return NextResponse.json({ message: 'id 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuction(auction_id);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
