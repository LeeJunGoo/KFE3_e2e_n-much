import { intervalToDuration, isAfter } from 'date-fns';

export const formatRemainingTime = (startTime: string, endTime: string) => {
  // 경매가 이미 종료되었는지 확인
  if (isAfter(startTime, endTime)) {
    return '경매 종료';
  }

  // 현재 시간과 종료 시간 사이의 기간을 계산
  const duration = intervalToDuration({
    start: startTime,
    end: endTime
  });

  // duration 객체에서 필요한 값을 추출 (값이 없을 경우 0으로 처리)
  const { days = 0, hours = 0, minutes = 0, seconds = 0 } = duration;

  // 원하는 형식의 문자열로 조합
  const remainingString = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초`;

  return remainingString;
};
