import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { type AuctionRow } from 'src/shared/supabase/types';
import { twMerge } from 'tailwind-merge';

const EpisodeWriteButton = ({
  auctionId,
  isWritten,
  className
}: {
  auctionId: AuctionRow['auction_id'];
  isWritten: boolean;
  className?: string;
}) => {
  return isWritten ? (
    // 사연이 이미 작성된 경우: '사연 작성 완료' 비활성 버튼 표시
    <Button variant="inActive" size="lg" disabled className={twMerge('w-full', className)}>
      사연 작성 완료
    </Button>
  ) : (
    // 사연을 아직 작성하지 않은 경우: '사연 작성하기' 링크 버튼 표시
    <Button asChild variant="inActive" size="lg" className={twMerge('w-full', className)}>
      <Link href={`/episode/${auctionId}`}>사연 작성하기</Link>
    </Button>
  );
};

export default EpisodeWriteButton;
