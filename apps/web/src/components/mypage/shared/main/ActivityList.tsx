import ActivityListItem from './ActivityListItem';
import type { Activity, UserRoleDataProps } from 'src/types/mypage';

//삭제 에정
export const activities: Activity[] = [
  {
    type: 'auction',
    title: '빈티지 카메라 경매',
    date: '2025년 6월 23일',
    status: 'PROGRESS'
  },
  {
    type: 'point',
    title: '포인트 충전',
    date: '2025년 6월 22일',
    amount: 3000
  },
  {
    type: 'event',
    title: '이벤트 보상',
    date: '2025년 6월 21일',
    amount: 500
  },
  {
    type: 'event',
    title: '이벤트 참여',
    date: '2025년 6월 20일',
    amount: -300
  },
  {
    type: 'signup',
    title: '회원가입 포인트 지급',
    date: '2025년 6월 19일',
    amount: 1000
  },
  {
    type: 'auction',
    title: '빈티지 시계 경매',
    date: '2025년 6월 18일',
    status: 'ENDED'
  },
  {
    type: 'point',
    title: '포인트 사용',
    date: '2025년 6월 17일',
    amount: -1500
  }
];

const ActivityList = () => {
  const recent = activities.slice(0, 5); // 최신순 5개만

  return (
    <section className="mt-6">
      <h3 className="mb-3 font-medium">최근 활동</h3>
      <ul className="rounded-xl bg-white p-4 shadow-sm">
        {recent.map((activity, idx) => (
          <ActivityListItem key={idx} activity={activity} />
        ))}
      </ul>
    </section>
  );
};

export default ActivityList;
