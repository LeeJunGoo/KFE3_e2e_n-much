'use client';

import { Button } from '@repo/ui/components/ui/button';
import { AuctionRow, EpisodeRow } from 'src/lib/supabase/type';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { fetchCreateEpisode, fetchEditEpisode } from 'src/lib/queries/episodes';
import { User } from '@supabase/supabase-js';

const EpisodesForm = ({
  initialEpisodeInfo,
  initialUserInfo,
  episode_id,
  auction_id
}: {
  initialUserInfo: User | null | undefined;
  initialEpisodeInfo: EpisodeRow | undefined;
  episode_id: EpisodeRow['episode_id'] | undefined;
  auction_id: AuctionRow['auction_id'];
}) => {
  const [title, setTitle] = useState(initialEpisodeInfo?.title || '');
  const [description, setDescription] = useState(initialEpisodeInfo?.description || '');
  const router = useRouter();

  const isEditMode = !!initialEpisodeInfo;
  const buyer_id = isEditMode ? initialEpisodeInfo.buyer_id : 'a2aafe6d-d5cb-4cdf-bde3-80349795c787';
  // const buyer_id = isEditMode ? initialEpisodeInfo.buyer_id : initialUserInfo?.id; // 로그인

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = isEditMode
        ? await fetchEditEpisode({ episode_id, title, description })
        : await fetchCreateEpisode({ auction_id, buyer_id, title, description });
      if (result === 'success') {
        const alertContent = isEditMode ? '사연을 수정하였습니다.' : '사연을 등록하였습니다.';
        alert(alertContent);
        router.push(`/auctions/${auction_id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 border-2 rounded-lg p-4">
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">{isEditMode ? '사연 수정' : '사연 등록'}</h3>
          <span className="text-sm text-[#C6C7D1]">
            {isEditMode ? '사연의 내용을 수정해주세요.' : ' 경매에 참여할 사연을 입력해주세요'}
          </span>
        </div>
        <label htmlFor="title" className="text-sm text-gray-500">
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mt-1 p-3 rounded-md border border-[#F4F4F7] text-gray-500 "
          placeholder="경매 상품의 제목을 입력하세요"
          required
        />
        {/* 상세 내용 */}
        <div>
          <label htmlFor="description" className="text-sm text-gray-500">
            상세 내용
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full mt-1 p-3 rounded-md border border-[#F4F4F7]  text-gray-500 resize-none "
            placeholder="상품에 대한 자세한 설명을 입력하세요"
            required
          ></textarea>
          {/* 초기화, 등록 버튼 */}
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              type="button"
              className="bg- hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button
              variant="default"
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {isEditMode ? '수정 완료' : '사연 등록'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EpisodesForm;
