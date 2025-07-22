import Link from 'next/link';
import { getHasUserWrittenEpisode } from 'src/entities/episode/api';
import { type AuctionRow } from 'src/shared/supabase/types';
import { twMerge } from 'tailwind-merge';

const EpisodeWriteButton = async ({ auctionId }: { auctionId: AuctionRow['auction_id'] }) => {
  const userId = 'e40600a6-a437-47b8-840a-ced55b143dc0';
  const isWritten = await getHasUserWrittenEpisode(auctionId, userId);

  return (
    <Link
      href={isWritten ? '#' : `/episode/${auctionId}`}
      aria-disabled={isWritten}
      className={twMerge(
        'flex-1 rounded-md p-2 text-center transition-colors',
        isWritten
          ? 'bg-(--color-light-gray) text-(--color-secondary) pointer-events-none cursor-not-allowed'
          : 'bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary)'
      )}
    >
      {isWritten ? '사연 작성 완료' : '사연 작성하기'}
    </Link>
  );
};

export default EpisodeWriteButton;
