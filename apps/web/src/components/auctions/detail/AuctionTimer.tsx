'use client';

import { differenceInHours, formatDistanceToNow } from 'date-fns';
import { TZDate } from 'react-day-picker';
import { IoMdTime } from 'react-icons/io';

import { AuctionTimeProps } from 'src/types/auctions/detail';

const AuctionTimer = ({ endTime }: AuctionTimeProps) => {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(endTime, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  // const timerTextColor = diffDay && diffDay < 0 ? 'bg-[#D84A5F] hover:bg-[#D84A5F]' : 'bg-[#5B80C2] hover:bg-[#5B80C2]';
  const timerTextColor = 'text-(--color-assent)';

  return (
    <div className="mb-3 flex items-center gap-1 text-(--color-accent)">
      <IoMdTime />
      <span className={`text-sm font-semibold ${timerTextColor}`}>남은 시간: {remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
