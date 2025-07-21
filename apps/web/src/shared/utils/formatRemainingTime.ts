import { formatDuration, intervalToDuration } from 'date-fns';
import { ko } from 'date-fns/locale';
import { TZDate } from 'react-day-picker';
import { type AuctionTimerStatus } from 'src/entities/auction/types';

type RemainingTimeType = {
  status: AuctionTimerStatus;
  remainTime: string;
  formattedTime: string;
};

export const formatRemainingTime = (endDate: string): RemainingTimeType => {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const end = new TZDate(endDate, 'Asia/Seoul');
  let status: AuctionTimerStatus;
  let remainTime = '';

  const duration = intervalToDuration({ start: now, end });

  //ANCHOR - 전체 남은 시간을 표시(사연 등록 페이지)
  const formattedTime = formatDuration(duration, {
    format: ['days', 'hours', 'minutes'],
    locale: ko
  });

  //ANCHOR - status: 상태에 따라 시간 color 변경
  if (duration.days! <= 0 && duration.hours! <= 0) {
    status = 'urgent';
  } else {
    status = 'ongoing';
  }

  //ANCHOR - 일부 남은 시간을 표시(메인 페이지의 뱃지)
  switch (true) {
    case (duration.years ?? 0) > 0:
      remainTime = `${duration.years}년 남음`;
      break;

    case (duration.months ?? 0) > 0:
      remainTime = `${duration.months}개월 남음`;
      break;

    case (duration.days ?? 0) > 0:
      remainTime = `${duration.days}일 남음`;
      break;

    case (duration.hours ?? 0) > 0:
      remainTime = `${duration.hours}시간 남음`;
      break;

    case (duration.minutes ?? 0) > 0:
      remainTime = `${duration.minutes}분 남음`;
      break;

    default:
      remainTime = '종료';
      break;
  }

  return {
    status,
    remainTime,
    formattedTime
  };
};
