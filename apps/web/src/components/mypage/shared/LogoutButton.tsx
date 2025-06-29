'use client';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { fetchLogout } from 'src/lib/queries/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    // 확인 다이얼로그
    const isConfirmed = window.confirm('정말로 로그아웃하시겠습니까?');

    if (!isConfirmed) return;

    try {
      await fetchLogout();
      toast.success('로그아웃 되었습니다!');
    } catch (error) {
      console.error('로그아웃 에러:', error);
      toast.error(error instanceof Error ? error.message : '로그아웃 실패');
    }
  };

  return (
    <div className="my-4 flex items-center justify-center text-(--color-warm-gray)">
      <Button variant="ghost" onClick={handleLogout}>
        <span>로그아웃</span>
      </Button>
    </div>
  );
};

export default LogoutButton;
