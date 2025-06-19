'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useState } from 'react';
import { FiAward, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { BiddingForm } from './BiddingForm';
import { EpisodeProps } from './EpisodeList';

const EpisodeItem = ({ story }: { story: EpisodeProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBiddingOpen, setIsBiddingOpen] = useState(false);

  return (
    <li className="px-6 py-5 list-none">
      {/* 작성자 정보 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <p className="font-semibold text-gray-800">{story.author.name}</p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <IoMdTime />
              <time>{story.timestamp}</time>
            </div>
          </div>
        </div>
      </div>
      {/* 사연 제목 및 내용 */}
      <div className="mt-4">
        <h3 className="text-lg font-bold text-gray-900">{story.title}</h3>
        <p className="mt-2 text-gray-700 leading-relaxed whitespace-pre-wrap">{isExpanded && story.content}</p>
      </div>
      {/* 더보기 및 기능 버튼 */}
      <Collapsible open={isBiddingOpen} defaultOpen={false} onOpenChange={setIsBiddingOpen} className="mt-4">
        {/* 버튼들이 포함된 최상단 영역 */}
        <div className="flex items-center justify-between">
          {/* 더보기 버튼 */}
          <Button variant="link" className="p-0 text-sm text-blue-600" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '접기' : '더보기'}
          </Button>
          {/* 오른쪽 버튼 그룹 */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <FiEdit />
              수정
            </Button>
            <Button variant="destructive" size="sm" className="gap-1.5">
              <FiTrash2 />
              삭제
            </Button>

            <CollapsibleTrigger asChild>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 gap-1.5">
                <FiAward />
                입찰하기
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        {/* 4. 펼쳐질 콘텐츠 영역 - 버튼 그룹과 완전히 분리되어 있습니다. */}
        <CollapsibleContent className="mt-2 CollapsibleContent">
          <BiddingForm currentBid={850000} userPoints={10000} />
        </CollapsibleContent>
      </Collapsible>
    </li>
  );
};
export default EpisodeItem;
