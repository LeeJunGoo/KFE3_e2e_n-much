'use client';
import ConfirmDialog from 'src/components/common/ui/ConfirmDialog';
import { toast } from '@repo/ui/components/ui/sonner';
import { Button } from '@repo/ui/components/ui/button';
import { fetchLogout } from 'src/lib/queries/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await fetchLogout();
      toast.success('로그아웃 되었습니다!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : '로그아웃 실패');
    }
  };

  return (
    <div className="my-4 flex items-center justify-center text-(--color-warm-gray)">
      <ConfirmDialog title="로그아웃 확인" description="정말로 로그아웃하시겠습니까?" onConfirm={handleLogout}>
        <Button variant="ghost">
          <span>로그아웃</span>
        </Button>
      </ConfirmDialog>
    </div>
  );
};

export default LogoutButton;
