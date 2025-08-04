'use client';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();

  const buttonProps = {
    variant: 'active' as const,
    size: 'lg' as const,
    className: twMerge('w-full hover:bg-(--color-primary)', className)
  };

  const getHref = () => {
    const queryString = searchParams.toString();
    return `/episode/${auctionId}${queryString ? `?${queryString}` : ''}`;
  };

  return isWritten ? (
    <Button {...buttonProps} disabled>
      사연 작성 완료
    </Button>
  ) : (
    <Button {...buttonProps} asChild>
      <Link href={getHref()}>사연 작성하기</Link>
    </Button>
  );
};

export default EpisodeWriteButton;
