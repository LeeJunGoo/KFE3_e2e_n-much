import { AuctionInsert } from 'src/lib/supabase/type';
import {
  addAuction,
  deleteAuction,
  getAllAuctions,
  getAuction,
  updateAuction,
  getMyCreatedAuctions,
  getMyBidAuctions
} from '../../../lib/supabase/query/auctions';
import { NextRequest } from 'next/server';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const auctionId = searchParams.get('auction_id');
  const sellerId = searchParams.get('seller_id');
  const buyerId = searchParams.get('buyer_id');

  try {
    // 특정 경매 조회
    if (auctionId) {
      const res = await getAuction(auctionId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    // 내가 올린 경매 조회 (경매자)
    if (sellerId) {
      const res = await getMyCreatedAuctions(sellerId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    // 내가 입찰한 경매 조회 (입찰자)
    if (buyerId) {
      const res = await getMyBidAuctions(buyerId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    // 전체 경매 조회
    const res = await getAllAuctions();
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
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
