import { getHighestBid } from '../../../../lib/supabase/query/episodes';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const auctionId = searchParams.get('auction_id');

  if (!auctionId)
    return NextResponse.json(
      { message: 'auction_id가 필요합니다.' },
      { status: 400, statusText: 'searchParams undefined' }
    );

  try {
    const highestBidData = await getHighestBid(auctionId);

    return NextResponse.json(highestBidData);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500, statusText: '서버 에러 발생' });
    }
  }
}
