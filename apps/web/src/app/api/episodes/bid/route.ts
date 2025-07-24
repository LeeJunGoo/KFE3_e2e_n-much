import { type NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { selectAuctionBidPointAmount } from 'src/entities/auction/supabase';
import { selectUserBidPointAmount } from 'src/entities/episode/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get('user_id');
  const auctionId = searchParams.get('auction_id');
  let res;

  if (!userId && !auctionId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (userId) {
      res = await selectUserBidPointAmount(userId);
    }

    if (auctionId) {
      res = await selectAuctionBidPointAmount(auctionId);
    }

    return NextResponse.json(res, { status: 201 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

// export async function PATCH(request: NextRequest) {
//   const { auction_id, episode_id, bid_point } = await request.json();
//   try {
//     const [episodeInfo, auctionInfo] = await Promise.all([
//       updateEpisodeBidPoint(episode_id, bid_point),
//       getAuction(auction_id)
//     ]);

//     // 에피소드의 입찰가가 경매 물품의 현재 입찰가보다 높을 경우, 경매 물품의 현재 입찰가를 변경
//     if (auctionInfo!.current_point < episodeInfo.bid_point) {
//       await updateAuction(auction_id, { current_point: episodeInfo.bid_point });
//     }

//     return NextResponse.json({ status: 'success', data: episodeInfo });
//   } catch (error) {
//     return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
//   }
// }
