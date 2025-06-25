import { NextRequest, NextResponse } from 'next/server';
import { getAuction, updateAuction } from 'src/lib/supabase/query/auctions';
import { updateEpisodeBidPoint } from 'src/lib/supabase/query/episodes';

export async function PATCH(request: NextRequest) {
  const { auction_id, episode_id, bid_point } = await request.json();
  try {
    const [episodeInfo, auctionInfo] = await Promise.all([
      await updateEpisodeBidPoint(episode_id, bid_point),
      await getAuction(auction_id)
    ]);

    // 에피소드의 입찰가가 경매 물품의 현재 입찰가보다 높을 경우, 경매 물품의 현재 입찰가를 변경
    if (auctionInfo!.current_point < episodeInfo.bid_point) {
      await updateAuction(auction_id, { current_point: episodeInfo.bid_point });
    }

    return NextResponse.json({ status: 'success', data: episodeInfo });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
