'use client';
import UserProfileCard from 'src/components/mypage/shared/UserProfileCard';
import MyPageMenuList from 'src/components/mypage/shared/MyPageMenuList';
import MyPageNotification from 'src/components/mypage/shared/MyPageNotification';
import ActivityList from 'src/components/mypage/shared/ActivityList';
import { useState } from 'react';
import PageContainer from 'src/components/layout/PageContainer';

type RoleType = 'AUCTIONEER' | 'BIDDER';

const MyPage = () => {
  //NOTE - supabase 연동 전까지는 목데이터로 임시 처리
  const [role] = useState<RoleType>('BIDDER');
  return (
    <PageContainer>
      <UserProfileCard role={role} />
      <MyPageMenuList role={role} />
      <MyPageNotification role={role} />
      <ActivityList role={role} />
    </PageContainer>
  );
};

export default MyPage;
