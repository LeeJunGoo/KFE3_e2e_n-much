'use client';

import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { deleteAuctionInfo } from 'src/entities/auction/api';
import type { AuctionRow } from 'src/shared/supabase/types';

const EditDeleteActions = ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const router = useRouter();

  const handleAuctionDelete = async () => {
    const confirmed = window.confirm('정말 이 사연를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteAuctionInfo(auctionId);
      if (result) {
        router.push('/main');
        toast.success('정상적으로 삭제 되었습니다.');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error('경매 물품을  삭제하지 못했습니다. 다시 시도해주세요.');
        console.error(error.message);
        router.refresh();
      }
    }
  };

  return (
    <div className="space-x-2">
      <Button variant="inActive" onClick={() => router.push(`/auctions/write?auction_id=${auctionId}`)}>
        수정
      </Button>
      <Button variant="outline" onClick={handleAuctionDelete}>
        삭제
      </Button>
    </div>
  );
};

export default EditDeleteActions;
