'use client';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';

const LogoutButton = () => {
  const handleLogout = () => {
    console.log('로그아웃 시도');
    toast.success('로그아웃 되었습니다!');
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
