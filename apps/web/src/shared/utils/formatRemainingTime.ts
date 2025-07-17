import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';
import { type AuctionTimerStatus } from 'src/entities/auction/types';

type RemainingTimeType = {
  status: AuctionTimerStatus;
  remainTime: string;
};

export const formatRemainingTime = (endDate: string): RemainingTimeType => {
  const now = new Date();
  const end = new Date(endDate);
  let status: AuctionTimerStatus;

  const duration = intervalToDuration({ start: now, end });
  const formatted = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    locale: ko
  });

  // 1시간 미만
  if (duration.days === 0 && duration.hours === 0) {
    status = 'urgent';
  } else {
    status = 'ongoing';
  }

  return {
    status,
    remainTime: formatted
  };
};
