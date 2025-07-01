'use client';

import { differenceInHours, formatDistanceToNow } from 'date-fns';
import { useEffect } from 'react';
import { TZDate } from 'react-day-picker';
import { IoMdTime } from 'react-icons/io';

import { fetchUpdateEpisodeWinning } from 'src/lib/queries/episodes';
import { AuctionTimeProps } from 'src/types/auctions/detail';
import { formatRemainingTime } from 'src/utils/formatRemainingTime';

const AuctionTimer = ({ highestBuyer, startTime, endTime }: AuctionTimeProps) => {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const auctionTime = new TZDate(endTime, 'Asia/Seoul');
  const diffDay = differenceInHours(now, auctionTime);
  const remainTime = formatDistanceToNow(auctionTime, { addSuffix: true });

  // const timerTextColor = diffDay && diffDay < 0 ? 'bg-[#D84A5F] hover:bg-[#D84A5F]' : 'bg-[#5B80C2] hover:bg-[#5B80C2]';
  const timerTextColor = 'text-(--color-assent)';

  // 데이터 처리
  useEffect(() => {
    if (status === 'ended' && highestBuyer?.episode_id) {
      const endedAction = async () => {
        const data = await fetchUpdateEpisodeWinning(highestBuyer.episode_id, (highestBuyer.winning_bid = true));
      };
      endedAction();
    }
  }, [status, highestBuyer]);

  return (
    <div className="mb-3 flex items-center gap-1 text-(--color-accent)">
      <IoMdTime />
      <span className={`text-sm font-semibold ${timerTextColor}`}>남은 시간: {remainTime}</span>
    </div>
  );
};

export default AuctionTimer;
