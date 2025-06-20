'use client';

import { AuctionRow } from '@repo/ui/types/auctions';
import { notFound } from 'next/navigation';

const EditDeleteActions = ({ auction_id }: { auction_id: AuctionRow['auction_id'] }) => {
  const handleAuctionDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/auctions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          auction_id: auction_id
        })
      });

      if (!res.ok) {
        if (res.status === 404) return notFound(); // 함수 호출로 수정
        throw new Error(`경매 상품을 삭제하지 못했습니다.: ${res.status}`);
      }
      const result = await res.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`경매 상품을 삭제하지 못했습니다.: ${error.message}`);
      }
    }
  };

  return (
    <div className="space-x-2">
      <button className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors">
        수정
      </button>
      <button
        onClick={handleAuctionDelete}
        className="bg-[#F4F4F7] px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors"
      >
        삭제
      </button>
    </div>
  );
};

export default EditDeleteActions;
