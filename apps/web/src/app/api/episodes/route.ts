import { NextResponse } from 'next/server';
import { createClient } from 'src/shared/supabase/client/server';
import {
  createEpisode,
  deleteEpisode,
  getEpisodesByAuctionId,
  getUserBiddingCount,
  getUserStories,
  selectEpisodeById,
  selectWinningEpisode,
  updateEpisodeById
} from '../../../entities/episode/supabase';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const episodeId = searchParams.get('episodeId');
  const auctionId = searchParams.get('auctionId');

  const type = searchParams.get('type');

  let res;
  try {
    if (!auctionId && !episodeId && !type) {
      return NextResponse.json('id 또는 type이 존재하지 않습니다.', { status: 400 });
    }

    if (auctionId) {
      res = await getEpisodesByAuctionId(auctionId);
    }
    //ANCHOR - 리팩토링 완료
    if (episodeId) {
      res = await selectEpisodeById(episodeId);
    }
    if (type === 'biddingCount') {
      const supabase = await createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다');
      }
      res = await getUserBiddingCount(user.id);
    }
    if (type === 'userStories') {
      const supabase = await createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다');
      }
      res = await getUserStories(user.id);
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const { auction_id, buyer_id, title, description } = await request.json();

  if (!auction_id || !buyer_id || !title || !description) {
    return NextResponse.json({ message: 'id, title, description 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await createEpisode(auction_id, buyer_id, title, description);

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { episodeId, title, description, winning_bid } = await request.json();
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  let res;

  if (!episodeId) {
    return NextResponse.json({ error: 'id 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (type === 'updateEpisode') {
      res = await updateEpisodeById({ episodeId, title, description });
    }

    if (type === 'winningEpisode') {
      res = await selectWinningEpisode(episodeId, winning_bid);
    }

    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { episode_id } = await request.json();
  try {
    const res = await deleteEpisode(episode_id);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}
