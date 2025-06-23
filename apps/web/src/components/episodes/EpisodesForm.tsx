'use client';

import { Button } from '@repo/ui/components/ui/button';
import { AuctionRow } from 'src/lib/supabase/type';

import { notFound, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { EpisodeReturnDataType } from 'src/types/episodes';

const EpisodesForm = ({
  initialData,
  auction_id
}: {
  initialData: EpisodeReturnDataType | null;
  auction_id: AuctionRow['auction_id'];
}) => {
  const [title, setTitle] = useState(initialData?.data.title || '');
  const [content, setContent] = useState(initialData?.data.description || '');
  const router = useRouter();

  const url = initialData ? 'http://localhost:3001/api/episodes/update' : 'http://localhost:3001/api/episodes/register';
  const buyer_id = initialData ? initialData?.data.buyer_id : '9c3f2e9c-dcc3-4c3f-8d42-1f7dfcc44374';
  const method = initialData ? 'PATCH' : 'POST';

  const bidPoint = initialData ? initialData?.data.bid_point : 0;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        method: method,
        body: JSON.stringify({
          episode_id: initialData?.data.episode_id,
          auction_id,
          buyer_id,
          title: title,
          description: content,
          bid_point: bidPoint
        })
      });

      if (!res.ok) {
        if (res.status === 404) return notFound;
        throw new Error('사연을 등록하는 과정에서 네트워크 에러가 발생했습니다.' + res.statusText);
      }
      const data = await res.json();
      console.log('🚀 ~ handleSubmit ~ data:', data);

      if (data.status === 'success') {
        const alertContent = initialData ? '사연을 수정하였습니다.' : '사연을 등록하였습니다.';
        alert(alertContent);
        router.push(`/auctions/${auction_id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('사연을 등록하지 못하였습니다.' + error.message);
      }
    }
  };

  const handleReset = () => {
    setTitle(initialData?.data.title || '');
    setContent(initialData?.data.description || '');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3 border-2 rounded-lg p-4">
      {/* 제목 */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">사연 등록</h3>
          <span className="text-sm text-[#C6C7D1]">
            {initialData ? '사연의 내용을 수정해주세요.' : ' 경매에 참여할 사연을 입력해주세요'}
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
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full mt-1 p-3 rounded-md border border-[#F4F4F7]  text-gray-500 resize-none "
            placeholder="상품에 대한 자세한 설명을 입력하세요"
            required
          ></textarea>
          {/* Action Buttons */}
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
              {initialData ? '수정 완료' : '사연 등록'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EpisodesForm;
