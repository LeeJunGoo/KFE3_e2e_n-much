import { NextRequest, NextResponse } from 'next/server';
import { getAuctionWithSellerInfo, getSellerAuctionCount } from 'src/lib/supabase/query/auctions';
import { getHighestBidder } from 'src/lib/supabase/query/episodes';

type ParamsType = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, { params }: ParamsType) {
  const { id } = await params;
  const searchParams = request.nextUrl.searchParams;
  const isType = searchParams.get('type');
  let res;

  try {
    if (isType === 'auction') {
      res = await getAuctionWithSellerInfo(id);
    }
    if (isType === 'seller') {
      res = await getSellerAuctionCount(id);
    }
    if (isType === 'buyer') {
      res = await getHighestBidder(id);
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
