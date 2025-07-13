'use client';

import { IoMdTime } from 'react-icons/io';
import { formatRemainingTime } from 'src/shared/utils/formatRemainingTime';
import { twMerge } from 'tailwind-merge';
import type { AuctionTimeProps } from 'src/entities/auction/types';

const AuctionTimer = ({ startTime, endTime, className }: AuctionTimeProps) => {
  const { status, remainTime } = formatRemainingTime(startTime, endTime);

  let timerTextColor = '';

  switch (status) {
    case 'upcoming':
      timerTextColor = 'text-(--color-red)';
      break;
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
