import { Card } from '@repo/ui/components/ui/card';
import React from 'react';
import { fetchEpisodesById } from 'src/lib/queries/episodes';
import { AuctionRow } from 'src/lib/supabase/type';
import EpisodeList from './EpisodeList';

const EpisodeDetailSection = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  //NOTE - 에피소드 리스트 및 개수
  const episodesListData = await fetchEpisodesById(auctionId);
  const episodesCount = episodesListData.count;
  return (
    <Card className="p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-(((--color-text-base))) font-medium">사연 모음</h3>
        <span className="text-sm text-(--color-accent)">사연 {episodesCount}</span>
      </div>

      {/* 사연 리스트 */}
      <EpisodeList auction_id={auctionId} />
    </Card>
  );
};

export default EpisodeDetailSection;
