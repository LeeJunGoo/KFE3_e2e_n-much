'use client';

import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
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
        toast.success('정상적으로 삭제 되었습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('경매 물품을  삭제하지 못했습니다. 다시 시도해주세요.');
        router.refresh();
      }
    }
  };

  return (
    <div className="space-x-2">
      <Button
        variant="secondary"
        className="rounded-sm px-4 py-2 text-sm font-semibold transition-colors hover:bg-(--color-primary)"
        onClick={() => router.push(`/auctions/write?auction_id=${auctionId}`)}
      >
        수정
      </Button>
      <Button
        variant="destructive"
        onClick={handleAuctionDelete}
        className="rounded-sm px-4 py-2 text-sm font-semibold transition-colors hover:bg-(--color-warm-gray)"
      >
        삭제
      </Button>
    </div>
  );
};

export default EditDeleteActions;
