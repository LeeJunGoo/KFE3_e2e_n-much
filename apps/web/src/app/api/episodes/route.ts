import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import {
  deleteEpisode,
  getEpisodesByAuctionId,
  getUserBiddingCount,
  getUserStories,
  insertEpisode,
  selectEpisodeById,
  selectWinningEpisode,
  updateEpisodeById
} from 'src/entities/episode/supabase';
import { createServer } from 'src/shared/supabase/client/server';

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

    if (episodeId) {
      res = await selectEpisodeById(episodeId);
    }
    if (type === 'biddingCount') {
      const supabase = await createServer();
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
  const { auctionId, userId, title, description } = await request.json();

  if (!auctionId || !userId || !title || !description) {
    return NextResponse.json({ error: '400: id, title, description 값이 존재하지 않습니다.' });
  }

  try {
    await insertEpisode({ auctionId, userId, title, description });
    return NextResponse.json('success');
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: `500: ${error.message}` });
  }
}

export async function PATCH(request: NextRequest) {
  const { episodeId, title, description, winning_bid } = await request.json();
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');
  let res;

  if (!episodeId) {
    return NextResponse.json({ error: '400: id 값이 존재하지 않습니다.' });
  }

  try {
    if (type === 'updateEpisode') {
      res = await updateEpisodeById({ episodeId, title, description });
    }

    if (type === 'winningEpisode') {
      res = await selectWinningEpisode(episodeId, winning_bid);
    }

    return NextResponse.json('success');
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({ error: `500: ${error.message}` });
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
