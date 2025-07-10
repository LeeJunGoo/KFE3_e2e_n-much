import { NextRequest, NextResponse } from 'next/server';
import { getAuctionWithSellerInfo, getSellerAuctionCount } from 'src/entities/auction/supabase';
import { getHighestBidder } from 'src/entities/episode/supabase';

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  let res;

  try {
    if (type === 'auction') {
      res = await getAuctionWithSellerInfo(id);
    } else if (type === 'seller') {
      res = await getSellerAuctionCount(id);
    } else if (type === 'buyer') {
      res = await getHighestBidder(id);
    } else {
      return NextResponse.json(
        { status: 'error', message: '잘못된 정보를 전달하였습니다.', id, type },
        { status: 400 }
      );
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
