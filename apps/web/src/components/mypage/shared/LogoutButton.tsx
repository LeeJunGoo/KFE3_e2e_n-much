import { Button } from '@repo/ui/components/ui/button';

const LogoutButton = () => {
  return (
    <div className="my-4 flex items-center justify-center text-(--color-warm-gray)">
      <Button variant="ghost">
        <span className="">로그아웃</span>
      </Button>
    </div>
  );
};

export default LogoutButton;
