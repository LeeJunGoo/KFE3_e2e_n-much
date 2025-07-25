'use client';

import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteEpisodeMutation } from 'src/entities/episode/queries/episode';
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

  const { mutateAsync, isPending } = useDeleteEpisodeMutation({ auctionId, currentPage });

  const handleEdit = () => {
    router.push(`/episode/${auctionId}/${episodeId}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 이 사연를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    await mutateAsync(episodeId);

    router.refresh();
  };
  return (
    <div className="flex space-x-2">
      <Button onClick={handleEdit} variant="text" size="sm" className="-px-3 text-xs">
        수정
      </Button>
      <Button
        onClick={handleDelete}
        variant="text"
        size="sm"
        className="text-(--color-red) text-xs"
        disabled={isPending}
      >
        삭제
      </Button>
    </div>
  );
};

export default EpisodeActionButtons;
