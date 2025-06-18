import {
  addAuction,
  deleteAuction,
  getAllAuctions,
  getAuction,
  updateAuction
} from '@repo/ui/utils/supabase/query/auctions';
import { NextRequest } from 'next/server';
import type { CreateAuctionPayload } from '@repo/ui/types/auctions/index';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const param = searchParams.get('auction_id');

  try {
    if (param === null) {
      const res = await getAllAuctions();
      return Response.json({ status: 'success', data: res }, commonHeader);
    } else {
      const res = await getAuction(param);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function POST(request: NextRequest) {
  const auctionData: CreateAuctionPayload = await request.json();

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
