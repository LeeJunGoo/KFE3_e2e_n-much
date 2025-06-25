'use client';

import { Button } from '@repo/ui/components/ui/button';

import { useState } from 'react';
import { FiAward } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';

import { BiddingForm } from './BiddingForm';
import EditDeleteEpisodes from './EditDeleteEpisodes';
import { EpisodeItemProps } from 'src/types/episodes';
import { formatToKoreanDateTime } from 'src/utils/formatToKoreanDateTime';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/ui/components/ui/collapsible';

const EpisodeItem = ({ episode }: { episode: EpisodeItemProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBiddingOpen, setIsBiddingOpen] = useState(false);
  const episodeTime = formatToKoreanDateTime(episode.created_at);

  return (
    <li className="px-6 py-5 list-none">
      {/* 작성자 정보 */}
      <div>
        <div>
          <p className="font-semibold text-gray-800">{episode.buyer.nickname}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <IoMdTime />
            <time>{episodeTime}</time>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-900">{episode.title}</h3>
          <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">{isExpanded && episode.description}</p>
        </div>
      </div>

      <Collapsible open={isBiddingOpen} defaultOpen={false} onOpenChange={setIsBiddingOpen} className="mt-4">
        <div className="flex justify-between">
          {/* 더보기 버튼 */}
          <Button variant="link" className="p-0 text-sm text-blue-600" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '접기' : '더보기'}
          </Button>

          {/* 오른쪽 버튼 그룹 */}
          <div className="flex items-center gap-2">
            {/* 에피소드 수정 및 삭제 버튼 */}
            <EditDeleteEpisodes auction_id={episode.auction_id} episode_id={episode.episode_id} />

            <CollapsibleTrigger asChild>
              <Button size="sm" className="bg-[#8E74F9] hover:bg-[#3f3562] gap-1.5">
                <FiAward />
                입찰하기
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        {/*  펼쳐질 콘텐츠 영역 - 버튼 그룹과 완전히 분리 */}
        <CollapsibleContent className="mt-2 CollapsibleContent w-full space-y-4 rounded-lg bg-[#F4F4F7] p-4">
          <BiddingForm
            auction_id={episode.auction_id}
            episode_id={episode.episode_id}
            currentBid={episode.bid_point}
            userPoint={1000000}
          />
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};
export default EpisodeItem;
