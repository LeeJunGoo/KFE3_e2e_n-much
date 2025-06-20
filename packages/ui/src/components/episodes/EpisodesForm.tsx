'use client';

import { Button } from '@repo/ui/components/ui/button';
import { AuctionRow } from '@repo/ui/types/auctions';
import { notFound, useRouter } from 'next/navigation';
import React, { useState } from 'react';

const EpisodesForm = ({ auction_id }: { auction_id: AuctionRow['auction_id'] }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleReset = () => {
    setTitle('');
    setContent('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/api/episodes/register', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
          auction_id,
          user_id: '9c3f2e9c-dcc3-4c3f-8d42-1f7dfcc44374',
          title: title,
          description: content,
          bid_point: 0
        })
      });

      if (!res.ok) {
        if (res.status === 404) return notFound;
        throw new Error('사연을 등록하는 과정에서 네트워크 에러가 발생했습니다.' + res.statusText);
      }
      const data = await res.json();

      if (data.status === 'success') {
        router.push(`/auctions/${auction_id}`);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('사연을 등록하지 못하였습니다.' + error.message);
      }
    }

    alert('사연 등록 처리!');
  };
  return (
    <form onSubmit={handleSubmit} className="mt-3 border-2 rounded-lg p-4">
      {/* 제목 */}
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-bold">사연 등록</h3>
          <span className="text-sm text-[#C6C7D1]">경매에 참여할 사연을 입력해주세요</span>
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
              사연 등록
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EpisodesForm;
