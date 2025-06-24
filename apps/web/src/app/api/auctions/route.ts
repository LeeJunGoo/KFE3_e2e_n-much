import { NextRequest, NextResponse } from 'next/server';
import { AuctionInsert } from 'src/lib/supabase/type';
import {
  addAuction,
  deleteAuction,
  getAllAuctions,
  getAuctionWithSellerInfo,
  updateAuction
} from '../../../lib/supabase/query/auctions';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const auctionId = searchParams.get('auction_id');

  try {
    // 특정 경매 조회
    if (auctionId) {
      const res = await getAuctionWithSellerInfo(auctionId);
      return NextResponse.json({ status: 'success', data: res });
    }

    // 전체 경매 조회
    const res = await getAllAuctions();
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
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message });
    }
  }
}

// export async function PATCH(request: NextRequest) {
//   const { auction_id, editData } = await request.json();

//   try {
//     const res = await updateAuction(auction_id, editData);
//     return NextResponse.json({ status: 'success', data: res });
//   } catch (error) {
//     if (error instanceof Error) {
//       return NextResponse.json({ status: 'error', error: error.message });
//     }
//   }
// }

export async function DELETE(request: NextRequest) {
  const { auction_id } = await request.json();

  if (!auction_id) {
    return NextResponse.json({ message: 'id 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuction(auction_id);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
