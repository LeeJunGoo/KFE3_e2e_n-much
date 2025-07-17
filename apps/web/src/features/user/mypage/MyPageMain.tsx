'use client';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/authStore';
import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageNotification from 'src/features/user/mypage/components/main/MyPageNotification';
import MyPageRecentActivity from 'src/features/user/mypage/components/main/MyPageRecentActivity';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import MyPageMainSkeleton from 'src/features/user/mypage/components/shared/skeleton/MyPageMainSkeleton';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  const user = useUserState();
  const loading = useUserLoadingState();

  if (!user || !user.user_metadata) return null;

  console.log(user?.user_metadata);
  console.log(loading);

  if (loading) return <MyPageMainSkeleton />;

  return (
    <PageContainer>
      <MyPageUserProfile data={user?.user_metadata} />
      <MyPageNavigation />
      <MyPageNotification />
      <MyPageRecentActivity />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPageMain;
