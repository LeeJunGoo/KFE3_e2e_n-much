'use client';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useAuthActions, useUserLoadingState, useUserState } from 'src/entities/auth/stores/authStore';
import LogoutButton from 'src/features/user/mypage/components/main/LogoutButton';
import MyPageNavigation from 'src/features/user/mypage/components/main/MyPageNavigation';
import MyPageUserProfile from 'src/features/user/mypage/components/main/MyPageUserProfile';
import MyPageMainSkeleton from 'src/features/user/mypage/components/shared/skeleton/MyPageMainSkeleton';
import PageContainer from 'src/shared/ui/PageContainer';

const MyPageMain = () => {
  const user = useUserState();
  const loading = useUserLoadingState();
  const { fetchUserProfile } = useAuthActions();
  const router = useRouter();

  if (!user || !user.user_metadata) return null;

  if (loading) return <MyPageMainSkeleton />;

  console.log(user);

  const handleLogout = async () => {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <PageContainer>
      <button onClick={handleLogout}>로그아웃</button>
      <div>현재 role: {user?.role}</div>
      <MyPageUserProfile data={user?.user_metadata} />
      <MyPageNavigation />
      <LogoutButton />
    </PageContainer>
  );
};

export default MyPageMain;
