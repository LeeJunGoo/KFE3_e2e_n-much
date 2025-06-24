'use client';

import { useCountdown } from 'src/hooks/useCountDown';
import { AuctionRow } from 'src/lib/supabase/type';

type AuctionTimeProps = Pick<AuctionRow, 'start_time' | 'end_time'>;

const AuctionTimer = ({ start_time, end_time }: AuctionTimeProps) => {
  const { remainingTime, status } = useCountdown(start_time, end_time);
  const timerTextColor = status === 'ongoing' ? 'text-blue-600' : 'text-red-600 animate-pulse';

  return (
    <div>
      <p className="text-sm text-[#6B7280]">경매 남은 시간</p>
      <p className={`text-lg font-semibold ${timerTextColor}`}>{remainingTime}</p>
    </div>
  );
};

export default AuctionTimer;
