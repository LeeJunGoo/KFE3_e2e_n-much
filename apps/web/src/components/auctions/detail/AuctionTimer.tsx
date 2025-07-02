'use client';

import { IoMdTime } from 'react-icons/io';

import { AuctionTimeProps } from 'src/types/auctions/detail';
import { formatRemainingTime } from 'src/utils/formatRemainingTime';

const AuctionTimer = ({ startTime, endTime }: AuctionTimeProps) => {
  const { status, remainTime } = formatRemainingTime(startTime, endTime);

  let timerTextColor = '';

  switch (status) {
    case 'upcoming':
      timerTextColor = 'text-[--color-red]';
      break;
    case 'ongoing':
      timerTextColor = 'text-[--color-blue]';
      break;
    case 'ended':
      timerTextColor = 'text-[--color-gray]';
      break;
    default:
      timerTextColor = 'text-[--color-default]';
      break;
  }

  return (
    <div className="mb-3 flex items-center gap-1 text-(--color-accent)">
      <IoMdTime />
      <span className={`text-sm font-semibold ${timerTextColor}`}>{remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
