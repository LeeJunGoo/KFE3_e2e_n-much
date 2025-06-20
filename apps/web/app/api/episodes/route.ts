import {
  addEpisode,
  deleteEpisode,
  getAllEpisodes,
  getEpisode,
  getEpisodesByAuctionId,
  getUserEpisodes,
  updateEpisode
} from '@repo/ui/utils/supabase/query/episodes';
import { NextRequest } from 'next/server';

const commonHeader = {
  headers: { 'Content-Type': 'application/json' }
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const episodeId = searchParams.get('episode_id');
  const userId = searchParams.get('user_id');
  const auction_id = searchParams.get('auction_id');

  try {
    if (episodeId) {
      const res = await getEpisode(episodeId);
      return Response.json({ status: 'success', data: res }, commonHeader);
    }

    if (userId) {
      const res = await getUserEpisodes(userId);
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
  const { auction_id, user_id, bid_point } = await request.json();

  try {
    const res = await addEpisode(auction_id, user_id, bid_point);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function PATCH(request: NextRequest) {
  const { story_id, winning_bid } = await request.json();

  try {
    const res = await updateEpisode(story_id, winning_bid);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { story_id } = await request.json();

  try {
    const res = await deleteEpisode(story_id);
    return Response.json({ status: 'success', data: res }, commonHeader);
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message }, commonHeader);
    }
  }
}
