import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageNotification from 'src/features/user/mypage/components/main/MyPageNotification';
import MyPageRecentActivity from 'src/features/user/mypage/components/main/MyPageRecentActivity';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  return (
    <PageContainer>
      <MyPageUserProfile />
      <MyPageNavigation />
      <MyPageNotification />
      <MyPageRecentActivity />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPageMain;
