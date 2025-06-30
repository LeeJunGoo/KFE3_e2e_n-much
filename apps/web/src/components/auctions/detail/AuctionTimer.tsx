'use client';

import { useEffect } from 'react';
import { IoMdTime } from 'react-icons/io';
import { useCountdown } from 'src/hooks/useCountDown';
import { fetchUpdateEpisodeWinning } from 'src/lib/queries/episodes';
import { AuctionTimeProps } from 'src/types/auctions/detail';

const AuctionTimer = ({ highestBuyer, startTime, endTime }: AuctionTimeProps) => {
  const { remainingTime, status } = useCountdown(startTime, endTime);
  const timerTextColor = status === 'ongoing' ? 'text-(--color-accent)' : 'text-(--color-red)';

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
      <span className={`text-sm font-semibold ${timerTextColor}`}>남은 시간: {remainingTime}</span>
    </div>
  );
};

export default AuctionTimer;
