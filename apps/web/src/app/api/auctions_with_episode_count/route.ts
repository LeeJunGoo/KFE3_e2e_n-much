import { NextResponse } from 'next/server';
import { getAllAuctionsWithEpisodeCountByOrder } from 'src/entities/auction/supabase';
import type { NextRequest } from 'next/server';

//TODO - 팀원들과 정렬순을 의논해서 수정할 것
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const order = searchParams.get('order');
  const page = searchParams.get('page');
  let res = null;

  console.log('order', order, 'page', page);

  if (!order || !page) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (order === 'favorites') {
      res = await getAllAuctionsWithEpisodeCountByOrder(order, false, Number(page));
    } else if (order === 'end_date') {
      res = await getAllAuctionsWithEpisodeCountByOrder(order, true, Number(page));
    } else if (order === 'created_at') {
      res = await getAllAuctionsWithEpisodeCountByOrder(order, true, Number(page));
    }

    if (!res) {
      return NextResponse.json({ error: '400: order의 값이 올바르지 않습니다.' }, { status: 400 });
    }

    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
