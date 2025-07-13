'use client';


import React, { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { toast } from '@repo/ui/components/ui/sonner';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { fetchCreateEpisode, fetchEditEpisode } from 'src/entities/episode/api';
import { EPISODE_TIP, MAX_DESC_LENGTH, MAX_TITLE_LENGTH } from 'src/entities/episode/constants';
import type { UserInfoType } from 'src/app/api/auth/user-info/route';
import type { AuctionRow, EpisodeRow } from 'src/shared/supabase/types';

const EpisodesForm = ({
  initialEpisodeInfo,
  userInfo,
  episode_id,
  auction_id
}: {
  userInfo: UserInfoType;
  initialEpisodeInfo: EpisodeRow | undefined;
  episode_id: EpisodeRow['episode_id'] | undefined;
  auction_id: AuctionRow['auction_id'];
}) => {
  const [title, setTitle] = useState(initialEpisodeInfo?.title || '');
  const [description, setDescription] = useState(initialEpisodeInfo?.description || '');
  const router = useRouter();

  const isEditMode = !!initialEpisodeInfo;
  const buyer_id = isEditMode ? initialEpisodeInfo.buyer_id : userInfo.buyer_id;

  const titleTextColor = title.length === MAX_TITLE_LENGTH ? 'text-(--color-red)' : 'text-(--color-warm-gray)';
  const descriptionTextColor =
    description.length === MAX_DESC_LENGTH ? 'text-(--color-red)' : 'text-(--color-warm-gray)';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = isEditMode
        ? await fetchEditEpisode({ episode_id, title, description }) // NOTE - 수정 모드
        : await fetchCreateEpisode({ auction_id, buyer_id, title, description }); // NOTE - 등록 모드
      if (result === 'success') {
        const alertContent = isEditMode ? '사연을 수정하였습니다.' : '사연을 등록하였습니다.';
        toast.success(alertContent);
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
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="mb-4">
        <label htmlFor="title" className="text-md text-(--color-text-base) block font-medium">
          사연 제목&nbsp;
          <span className="text-(--color-red)">*</span>
        </label>
        <div className="relative mt-2">
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-11 bg-white p-3.5"
            placeholder="경매 상품의 제목을 입력하세요."
            required
            maxLength={MAX_TITLE_LENGTH}
          />
          <div className={`absolute bottom-3 right-3 text-xs font-semibold ${titleTextColor}`}>{title.length}/40</div>
        </div>
      </div>
      {/* 상세 내용 */}
      <label htmlFor="description" className="text-md text-(--color-text-base) block font-medium">
        상세 내용&nbsp;
        <span className="text-(--color-red)">*</span>
      </label>
      <div className="relative mt-2">
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="h-51 w-full resize-none bg-white p-3.5"
          placeholder="이 경험이 당신에게 왜 특별한지 적어주세요...."
          required
          maxLength={MAX_DESC_LENGTH}
        ></Textarea>
        <div className={`absolute bottom-3 right-3 text-xs font-semibold ${descriptionTextColor}`}>
          {description.length}/1000
        </div>
      </div>

      <div className="my-6 rounded-lg bg-[#EEF2FB] p-4">
        <h3 className="mb-2 text-sm font-medium text-[#5B80C2]">
          <i className="fas fa-lightbulb mr-2"></i>좋은 사연을 위한 팁
        </h3>
        <ul className="text-(--color-warm-gray) space-y-2 text-sm">
          {EPISODE_TIP.map((text, index) => (
            <li key={index}>&bull;&nbsp;{text}&#46;</li>
          ))}
        </ul>
      </div>

      {/* 초기화, 등록 버튼 */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={handleReset} className="h-10 flex-1">
          초기화
        </Button>
        <Button variant="inActive" type="submit" className="h-10 flex-1">
          {isEditMode ? '수정 완료' : '사연 등록'}
        </Button>
      </div>
    </form>
  );
};

export default EpisodesForm;
