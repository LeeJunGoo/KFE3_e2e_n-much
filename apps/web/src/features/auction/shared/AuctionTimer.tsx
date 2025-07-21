'use client';

import { IoTime } from 'react-icons/io5';
import { type AuctionTimerStatus } from 'src/entities/auction/types';
import { twMerge } from 'tailwind-merge';

type AuctionTimerProps = {
  remainTime: string;
  status: AuctionTimerStatus;
  className?: string;
};

const AuctionTimer = ({ remainTime, status, className }: AuctionTimerProps) => {
  let timerTextColor = '';

  switch (status) {
    case 'ongoing':
      timerTextColor = 'text-(--color-accent)';
      break;
    case 'urgent':
      timerTextColor = 'text-(--color-red)';
      break;
  }

  return (
    <div className={twMerge(`flex items-center gap-1 text-sm font-semibold ${timerTextColor}`, className)}>
      <IoTime />
      <span>남은 시간:</span>
      <span>{remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
