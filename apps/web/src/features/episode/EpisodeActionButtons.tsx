'use client';

import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { deleteEpisodeInfo } from 'src/entities/episode/api';
import { usePageState } from 'src/entities/episode/stores/usePaginationStore';
import type { EpisodeRow } from 'src/shared/supabase/types';

const EpisodeActionButtons = ({
  auctionId,
  episodeId
}: {
  auctionId: EpisodeRow['auction_id'];
  episodeId: EpisodeRow['episode_id'];
}) => {
  const router = useRouter();
  const currentPage = usePageState();

  const handleEdit = () => {
    router.push(`/episode/${auctionId}/${episodeId}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 이 경매를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const result = await deleteEpisodeInfo(episodeId);

      if (result) {
        toast.success('정상적으로 삭제 되었습니다.');
        window.location.reload();
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
    <div className="flex space-x-2">
      <Button onClick={handleEdit} variant="text" size="sm" className="-px-3 text-xs">
        수정
      </Button>
      <Button onClick={handleDelete} variant="text" size="sm" className="text-(--color-red) text-xs">
        삭제
      </Button>
    </div>
  );
};

export default EpisodeActionButtons;
