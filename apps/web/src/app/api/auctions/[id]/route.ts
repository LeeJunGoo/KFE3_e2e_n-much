import { NextRequest, NextResponse } from 'next/server';
import { getAuction, getMyBidAuctions, getMyCreatedAuctions } from 'src/lib/supabase/query/auctions';

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
      res = await getAuction(id);
    }
    if (isType === 'seller') {
      res = await getMyCreatedAuctions(id);
    }
    if (isType === 'buyer') {
      res = await getMyBidAuctions(id);
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
