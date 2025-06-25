'use client';

import { useEffect } from 'react';
import { useCountdown } from 'src/hooks/useCountDown';
import { fetchUpdateEpisodeWinning } from 'src/lib/queries/episodes';
import { AuctionTimeProps } from 'src/types/auctions/detail';

const AuctionTimer = ({ highestBuyer, start_time, end_time }: AuctionTimeProps) => {
  const { remainingTime, status } = useCountdown(start_time, end_time);
  const timerTextColor = status === 'ongoing' ? 'text-blue-600' : 'text-red-600 animate-pulse';
  console.log('너가 실행');

  // 데이터 처리
  useEffect(() => {
    if (status === 'ended' && highestBuyer.episode_id) {
      console.log('너 실행');
      const endedAction = async () => {
        const data = await fetchUpdateEpisodeWinning(highestBuyer.episode_id, (highestBuyer.winning_bid = true));
        console.log('🚀 ~ endedAction ~ data:', data);
      };
      endedAction();
    }
  }, [status, highestBuyer]);

  return (
    <div>
      <p className="text-sm text-[#6B7280]">경매 남은 시간</p>
      <p className={`text-lg font-semibold ${timerTextColor}`}>{remainingTime}</p>
    </div>
  );
};

export default AuctionTimer;
