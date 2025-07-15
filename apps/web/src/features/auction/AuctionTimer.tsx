'use client';

import { IoMdTime } from 'react-icons/io';
import { useFormatRemainingTime } from 'src/shared/utils/formatRemainingTime';
import { twMerge } from 'tailwind-merge';
import type { AuctionTimeProps } from 'src/entities/auction/types';

const AuctionTimer = ({ endDate, className }: AuctionTimeProps) => {
  const { status, remainTime } = useFormatRemainingTime(endDate);
  let timerTextColor = '';

  switch (status) {
    case 'ongoing':
      timerTextColor = 'text-(--color-accent)';
      break;
    case 'ended':
      timerTextColor = 'text-(--color-warm-gray)';
      break;
    default:
      timerTextColor = 'text-(--color-accent)';
      break;
  }

  return (
    <div className={twMerge('text-(--color-accent) mb-3 flex items-center gap-1', className)}>
      <IoMdTime />
      <span className={`text-sm font-semibold ${timerTextColor}`}>{remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
