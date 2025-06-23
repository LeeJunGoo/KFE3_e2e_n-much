import { getUserAuctionCount } from '../../../../lib/supabase/query/users';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const sellerId = request.nextUrl.searchParams.get('seller_id');

  try {
    if (!sellerId) {
      return NextResponse.json(
        { message: 'seller_id가 필요합니다.' },
        { status: 400, statusText: 'searchParams undefined' }
      );
    }

    // 총 경매 수 조회, 진행 중인 경매 수 조회
    const { totalAuctions, activeAuctions } = await getUserAuctionCount(sellerId);
    return NextResponse.json({
      totalAuctions,
      activeAuctions
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500, statusText: '서버 에러 발생' });
    }
  }
}
