'use client';
import UserProfileCard from 'src/components/mypage/shared/UserProfileCard';
import MyPageMenuList from 'src/components/mypage/shared/MyPageMenuList';
import MyPageNotification from 'src/components/mypage/shared/MyPageNotification';
import ActivityList from 'src/components/mypage/shared/ActivityList';
import { useState } from 'react';

type RoleType = 'AUCTIONEER' | 'BIDDER';

const MyPage = () => {
  //NOTE - supabase 연동 전까지는 목데이터로 임시 처리
  const [role] = useState<RoleType>('BIDDER');
  return (
    <>
      <UserProfileCard role={role} />
      <MyPageMenuList role={role} />
      <MyPageNotification role={role} />
      <ActivityList role={role} />
    </>
  );
};

export default MyPage;
