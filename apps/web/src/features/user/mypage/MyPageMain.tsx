'use client';
import useAuth from 'src/entities/user/auth/hooks/useAuth';
import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageNotification from 'src/features/user/mypage/components/main/MyPageNotification';
import MyPageRecentActivity from 'src/features/user/mypage/components/main/MyPageRecentActivity';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import MyPageMainSkeleton from 'src/features/user/mypage/components/shared/skeleton/MyPageMainSkeleton';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  // NOTE - 임시, 로그인 수정하면 바꿀 예정
  const { user, loading } = useAuth();

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
