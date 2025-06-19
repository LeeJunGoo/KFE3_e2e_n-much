import { useEffect, useState } from 'react';

export interface CountdownState {
  remainingTime: string;
  status: 'upcoming' | 'ongoing' | 'ended' | 'urgent';
}

export const useCountdown = (startTime: string, endTime: string): CountdownState => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // 남은 시간을 계산하고 상태를 결정하는 함수
  const getCountdownState = (): CountdownState => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    // 상태 1: 시작 전
    if (now < startDate) {
      return {
        remainingTime: '시작 전',
        status: 'upcoming'
      };
    }

    // 상태 2: 종료됨
    if (now >= endDate) {
      return {
        remainingTime: '종료됨',
        status: 'ended'
      };
    }

    // 상태 3: 진행 중
    const diffInMs = endDate.getTime() - now.getTime();

    const days = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    let remainingString = '';
    if (days > 0) remainingString += `${days}일 `;
    if (hours > 0) remainingString += `${hours}시간 `;
    if (minutes > 0) remainingString += `${minutes}분`;

    // 5분 미만일 경우
    if (days === 0 && hours === 0 && minutes < 5) {
      return {
        remainingTime: remainingString,
        status: 'urgent'
      };
    }

    return {
      remainingTime: remainingString,
      status: 'ongoing'
    };
  };

  return getCountdownState();
};
