import { differenceInMinutes } from 'date-fns';
import { TZDate } from 'react-day-picker';

type AuctionStatus = 'upcoming' | 'ongoing' | 'ended';

interface RemainingInfo {
  status: AuctionStatus;
  remainTime: string;
}

export const formatRemainingTime = (startTime: string, endTime: string): RemainingInfo => {
  const now = new TZDate(new Date(), 'Asia/Seoul');
  const start = new TZDate(startTime, 'Asia/Seoul');
  const end = new TZDate(endTime, 'Asia/Seoul');

  let status: AuctionStatus;
  let remainTime = '';

  if (now < start) {
    // 경매 시작 전
    status = 'upcoming';
    const minutes = differenceInMinutes(start, now);
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;
    remainTime = `경매 시작까지: ${days}일 ${hours}시간 ${mins}분`;
  } else if (now >= start && now < end) {
    // 경매 진행 중
    status = 'ongoing';
    const minutes = differenceInMinutes(end, now);
    const days = Math.floor(minutes / (60 * 24));
    const hours = Math.floor((minutes % (60 * 24)) / 60);
    const mins = minutes % 60;

    remainTime = `남은 시간: ${days}일 ${hours}시간 ${mins}분`;
  } else {
    // 경매 종료
    status = 'ended';
    remainTime = '경매가 종료되었습니다.';
  }

  return { status, remainTime };
};
