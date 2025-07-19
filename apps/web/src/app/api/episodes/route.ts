import { error } from 'console';
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
      return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
    }

    if (auctionId) {
      res = await getEpisodesByAuctionId(auctionId);
    }

    //FIXME - 현재 경매 등록 페이지에서만 현재 GET을 사용 중이며, 경매 등록 페이지에서(수정일 경우에만 작동되므로, 위의 조건문에서 값이 전부 존재할 경우에만 실행)
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
      const supabase = await createServer();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다');
      }
      res = await getUserStories(user.id);
    }

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
export async function POST(request: NextRequest) {
  const { auctionId, userId, title, description } = await request.json();

  if (!auctionId || !userId || !title || !description) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }
  try {
    await insertEpisode({ auctionId, userId, title, description });
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const { episodeId, title, description, winning_bid } = await request.json();
  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type');

  if (!episodeId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (type === 'updateEpisode') {
      await updateEpisodeById({ episodeId, title, description });
    }

    if (type === 'winningEpisode') {
      await selectWinningEpisode(episodeId, winning_bid);
    }

    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
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
