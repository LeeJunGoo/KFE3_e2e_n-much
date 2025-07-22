'use client';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useUserLoadingState, useUserState } from 'src/entities/auth/stores/authStore';
import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import MyPageMainSkeleton from 'src/features/user/mypage/components/shared/skeleton/MyPageMainSkeleton';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  const user = useUserState();
  const loading = useUserLoadingState();

  if (!user) return null;

  if (loading) return <MyPageMainSkeleton />;

  console.log(user);

  return (
    <PageContainer>
      <div>현재 role: {user?.role}</div>
      <MyPageUserProfile data={user?.user_metadata} />
      <MyPageNavigation />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPageMain;
