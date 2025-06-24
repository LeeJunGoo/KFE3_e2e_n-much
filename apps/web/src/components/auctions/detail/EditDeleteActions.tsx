'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { fetchDeleteAuction } from 'src/lib/queries/auctions';
import { AuctionRow } from 'src/lib/supabase/type';

const EditDeleteActions = ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const router = useRouter();

  const handleAuctionDelete = async () => {
    const confirmed = window.confirm('정말 이 사연를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const result = await fetchDeleteAuction(auctionId);
      if (result === 'success') {
        router.push('/');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <div className="space-x-2">
      <Button
        variant="secondary"
        className="px-4 py-2 text-sm font-semibold rounded-md hover:bg-[#C6C7D1] transition-colors"
        onClick={() => router.push(`/auctions/write?auction_id=${auctionId}`)}
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
