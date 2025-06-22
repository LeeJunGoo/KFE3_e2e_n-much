'use client';

import { Button } from '@repo/ui/components/ui/button';
import { AuctionRow } from 'lib/supabase/type';
import { notFound, useRouter } from 'next/navigation';

const EditDeleteActions = ({ auction_id }: { auction_id: AuctionRow['auction_id'] }) => {
  const router = useRouter();

  const handleAuctionDelete = async () => {
    const confirmed = window.confirm('정말 이 사연를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

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

      router.push('/');
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`경매 상품을 삭제하지 못했습니다.: ${error.message}`);
      }
    }
  };

  return (
    <div className="space-x-2">
      <Button
        variant="secondary"
        className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors"
      >
        수정
      </Button>
      <Button
        variant="destructive"
        onClick={handleAuctionDelete}
        className=" px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors"
      >
        삭제
      </Button>
    </div>
  );
};

export default EditDeleteActions;
