import { useEffect, useRef, useState } from 'react';
import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';

type AuctionStatus = 'ongoing' | 'ended' | null;

interface RemainingInfo {
  status: AuctionStatus;
  remainTime: string;
}

export const useFormatRemainingTime = (endDate: string): RemainingInfo => {
  const [remainTime, setRemainTime] = useState('');
  const statusRef = useRef<AuctionStatus>(null);

  useEffect(() => {
    const now = new TZDate(new Date(), 'Asia/Seoul');
    const end = new TZDate(endDate, 'Asia/Seoul');

    const duration = intervalToDuration({ start: now, end });
    const formatted = formatDuration(duration, {
      format: ['days', 'hours', 'minutes'],
      locale: ko
    });
    if (now < end) {
      statusRef.current = 'ongoing';
    }
    if (now > end) {
      statusRef.current = 'ended';
    }

    setRemainTime(`남은 시간: ${formatted}`);
  }, [endDate]);

  return { status: statusRef.current, remainTime };
};
