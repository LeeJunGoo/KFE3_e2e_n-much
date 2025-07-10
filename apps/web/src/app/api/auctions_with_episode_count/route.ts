import { NextRequest, NextResponse } from 'next/server';
import { getAllAuctionsWithEpisodeCountByOrder } from 'src/entities/auction/supabase';

//TODO - 팀원들과 정렬순을 의논해서 수정할 것
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const orderParam = searchParams.get('order');
  const pageParam = searchParams.get('page');

  try {
    if (orderParam === 'favorites') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, false, Number(pageParam));
      return NextResponse.json({ status: 'success', data: res });
    } else if (orderParam === 'end_time') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, true, Number(pageParam));
      return NextResponse.json({ status: 'success', data: res });
    } else if (orderParam === 'created_at') {
      const res = await getAllAuctionsWithEpisodeCountByOrder(orderParam, true, Number(pageParam));
      return NextResponse.json({ status: 'success', data: res });
    }
    throw new Error('경매와 사연 갯수 불러오기 에러(잘못된 정렬 순서)');
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
