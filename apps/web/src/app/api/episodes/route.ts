import { NextResponse, type NextRequest } from 'next/server';
import {
  deleteEpisodeById,
  insertEpisode,
  selectEpisodeInfo,
  selectWinningEpisode,
  updateEpisodeById
} from 'src/entities/episode/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const episodeId = searchParams.get('episodeId');
  const type = searchParams.get('type');
  let res;

  try {
    if (!episodeId) {
      return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
    }

    if (episodeId) {
      res = await selectEpisodeInfo(episodeId);
    }

    // if (type === 'biddingCount') {
    //   const supabase = await createServer();
    //   const {
    //     data: { user }
    //   } = await supabase.auth.getUser();
    //   if (!user) {
    //     throw new Error('로그인된 사용자가 없습니다');
    //   }
    //   res = await getUserBiddingCount(user.id);
    // }
    // if (type === 'userStories') {
    //   const supabase = await createServer();
    //   const {
    //     data: { user }
    //   } = await supabase.auth.getUser();
    //   if (!user) {
    //     throw new Error('로그인된 사용자가 없습니다');
    //   }
    //   res = await getUserStories(user.id);
    // }

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
  const { episodeId } = await request.json();

  console.log('🚀 ~ DELETE ~ episodeId:', episodeId);
  if (!episodeId) {
    return NextResponse.json({ message: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    //
    const res = await deleteEpisodeById(episodeId);
    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
