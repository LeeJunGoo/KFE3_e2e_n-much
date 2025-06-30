'use client';
import UserProfileCard from 'src/components/mypage/shared/main/UserProfileCard';
import MyPageMenuList from 'src/components/mypage/shared/main/MyPageMenuList';
import MyPageNotification from 'src/components/mypage/shared/main/MyPageNotification';
import ActivityList from 'src/components/mypage/shared/main/ActivityList';
import PageContainer from 'src/components/layout/PageContainer';
import LogoutButton from 'src/components/mypage/shared/LogoutButton';
import { useGetUserInfo } from 'src/hooks/queries/useUsers';

const MyPage = () => {
  const { data: userInfo, isLoading, error } = useGetUserInfo();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>사용자 정보를 찾을 수 없습니다.</div>;
  if (!userInfo) return <div>사용자 정보가 없습니다.</div>;

  const { role, userInfo: userData } = userInfo;

  return (
    <PageContainer>
      <UserProfileCard role={role} userInfo={userData} />
      <MyPageMenuList role={role} />
      <MyPageNotification role={role} />
      <ActivityList />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPage;
