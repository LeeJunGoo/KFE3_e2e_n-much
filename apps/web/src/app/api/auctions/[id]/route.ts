import { NextRequest, NextResponse } from 'next/server';
import { getAuctionWithSellerInfo, getSellerAuctionCount } from 'src/lib/supabase/query/auctions';
import { getHighestBidder } from 'src/lib/supabase/query/episodes';

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
    }
    if (type === 'seller') {
      res = await getSellerAuctionCount(id);
    }
    if (type === 'buyer') {
      res = await getHighestBidder(id);
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
