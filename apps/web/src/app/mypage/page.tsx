import UserProfileCard from 'src/components/mypage/shared/UserProfileCard';
import MyPageMenuList from 'src/components/mypage/shared/MyPageMenuList';
import MyPageNotification from 'src/components/mypage/shared/MyPageNotification';
import ActivityList from 'src/components/mypage/shared/ActivityList';

const MyPage = () => {
  return (
    <>
      <UserProfileCard />
      <MyPageMenuList />
      <MyPageNotification />
      <ActivityList />
    </>
  );
};

export default MyPage;
