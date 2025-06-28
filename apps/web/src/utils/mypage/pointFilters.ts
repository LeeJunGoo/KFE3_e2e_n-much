import type { Activity } from 'src/types/mypage';

export const filterByPeriod = (activities: Activity[], period: string): Activity[] => {
  if (period === '전체') return activities;

  const now = new Date();
  let startDate: Date;

  switch (period) {
    case '1개월':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
      break;
    case '3개월':
      startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
      break;
    case '6개월':
      startDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
      break;
    default:
      return activities;
  }

  return activities.filter((activity) => {
    try {
      //FIXME -  "2025년 6월 22일" → "2025-06-22" 형식으로 변환 (수정예정)
      const dateStr = activity.date.replace(/년/g, '-').replace(/월/g, '-').replace(/일/g, '').replace(/\s/g, '');

      const activityDate = new Date(dateStr);
      return activityDate >= startDate;
    } catch (error) {
      console.warn('날짜 파싱 에러:', activity.date, error);
      return true;
    }
  });
};

export const filterByType = (activities: Activity[], type: string): Activity[] => {
  if (type === '전체') return activities;

  if (type === '충전') {
    return activities.filter(
      (activity) => activity.type === 'charge' || activity.type === 'signup' || activity.type === 'event'
    );
  }

  if (type === '사용') {
    return activities.filter((activity) => activity.type === 'auction' || activity.type === 'purchase');
  }

  return activities;
};

export const filterActivities = (activities: Activity[], periodFilter: string, typeFilter: string): Activity[] => {
  let filtered = activities;

  // 기간별 필터링
  filtered = filterByPeriod(filtered, periodFilter);

  // 유형별 필터링
  filtered = filterByType(filtered, typeFilter);

  return filtered;
};
