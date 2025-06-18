'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { FiAward, FiEdit, FiTrash2 } from 'react-icons/fi';
import { IoMdTime } from 'react-icons/io';
import { EpisodeProps } from './EpisodeList';

const EpisodeItem = ({ story }: { story: EpisodeProps }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      <div className="mt-4 flex items-center justify-between">
        <Button variant="link" className="p-0 text-sm text-blue-600" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '접기' : '더보기'}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <FiEdit />
            수정
          </Button>
          <Button variant="destructive" size="sm" className="gap-1.5">
            <FiTrash2 />
            삭제
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-1.5">
            <FiAward />
            입찰하기
          </Button>
        </div>
      </div>
    </li>
  );
};
export default EpisodeItem;
