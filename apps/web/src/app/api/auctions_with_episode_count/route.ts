import { NextRequest, NextResponse } from 'next/server';
import { getAllAuctionsWithEpisodeCount, getAllAuctionsWithEpisodeCountByOrder } from 'src/lib/supabase/query/auctions';

//TODO - 팀원들과 정렬순을 의논해서 수정할 것
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderParam = searchParams.get('order');

  try {
    if (orderParam === 'favorites') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, false);
      return NextResponse.json({ status: 'success', data: res });
    } else if (orderParam === 'end_time') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, true);
      return NextResponse.json({ status: 'success', data: res });
    } else if (orderParam === 'created_at') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, true);
      return NextResponse.json({ status: 'success', data: res });
    } else {
      const res = await getAllAuctionsWithEpisodeCount();
      return NextResponse.json({ status: 'success', data: res });
    }
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
