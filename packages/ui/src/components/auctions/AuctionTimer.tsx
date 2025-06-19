'use client';

import { useCountdown } from '@repo/ui/hooks/useCountDown';

// 예시: 이 컴포넌트는 props로 시작 시간과 종료 시간을 받습니다.
interface AuctionTimerProps {
  startTime: string;
  endTime: string;
}

const AuctionTimer = ({ startTime, endTime }: AuctionTimerProps) => {
  const { remainingTime, status } = useCountdown(startTime, endTime);

  // status 값에 따라 동적으로 텍스트 색상을 결정하는 함수
  const getStatusClasses = () => {
    switch (status) {
      case 'urgent':
        // 5분 미만일 때: 빨간색 + 반짝이는 효과(animate-pulse)
        return 'text-red-600 animate-pulse';
      case 'ongoing':
        // 진행 중: 파란색
        return 'text-blue-600';
      case 'ended':
        // 종료됨: 회색 (빨간색은 긴급 상태에 더 어울립니다)
        return 'text-gray-500';
      case 'upcoming':
      default:
        // 시작 전: 회색
        return 'text-gray-500';
    }
  };

  return (
    <div>
      <p className="text-sm text-[#6B7280]">경매 남은 시간</p>
      <p className={`text-lg font-semibold ${getStatusClasses()}`}>{remainingTime}</p>
    </div>
  );
};

export default AuctionTimer;
