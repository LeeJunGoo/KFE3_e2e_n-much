import { NextRequest } from 'next/server';
import {
  addEpisode,
  deleteEpisode,
  getAllEpisodes,
  getEpisode,
  getEpisodesByAuctionId,
  getUserEpisodes,
  updateEpisode
} from '../../../lib/supabase/query/episodes';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const episodeId = searchParams.get('episode_id');
  const buyerId = searchParams.get('buyer_id');
  const auction_id = searchParams.get('auction_id');

  try {
    if (episodeId) {
      const res = await getEpisode(episodeId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    if (buyerId) {
      const res = await getUserEpisodes(buyerId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    if (auction_id) {
      const res = await getEpisodesByAuctionId(auction_id);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    const res = await getAllEpisodes();
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function POST(request: NextRequest) {
  const { auction_id, buyer_id, bid_point } = await request.json();

  try {
    const res = await addEpisode(auction_id, buyer_id, bid_point);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function PATCH(request: NextRequest) {
  const { episode_id, winning_bid } = await request.json();

  try {
    const res = await updateEpisode(episode_id, winning_bid);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { episode_id } = await request.json();

  try {
    const res = await deleteEpisode(episode_id);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}
