import { patchEpisode, postEpisode } from '@repo/ui/utils/supabase/query/episodes';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { auction_id, user_id, title, description, bid_point } = await request.json();

  try {
    const res = await postEpisode(auction_id, user_id, title, description, bid_point);

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: 'error', error: error.message });
    }
  }
}
