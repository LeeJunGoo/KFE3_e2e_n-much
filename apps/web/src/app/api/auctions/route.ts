import { NextRequest, NextResponse } from 'next/server';
import { AuctionInsert } from 'src/lib/supabase/type';
import { addAuction, deleteAuction, getAllAuctions, updateAuction } from '../../../lib/supabase/query/auctions';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  try {
    // 전체 경매 조회
    const res = await getAllAuctions();
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    console.log('🚀 ~ GET ~ error:', error);
    return NextResponse.json({ status: 'error', error: 'Server Error' + error }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const auctionData: AuctionInsert = await request.json();

  try {
    const res = await addAuction(auctionData);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function PATCH(request: NextRequest) {
  const { auction_id, status } = await request.json();

  try {
    const res = await updateAuction(auction_id, status);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { auction_id } = await request.json();

  try {
    const res = await deleteAuction(auction_id);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}
