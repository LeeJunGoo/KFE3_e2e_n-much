'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from 'src/assets/images/logo.svg';
import { useUserStore } from 'src/entities/auth/stores/UserStore';
// import { getAuthLogout } from 'src/entities/auth/supabase';
import { toast } from '@repo/ui/components/ui/sonner';
// import { IoNotifications } from 'react-icons/io5';
// import { Button } from '@repo/ui/components/ui/button';

const Header = () => {
  const { userInfo, setUser } = useUserStore();

  // const handleLogOut = async () => {
  //   try {
  //     const res = await getAuthLogout();
  //     // 로그아웃 성공 시 store에 저장된 사용자 정보 삭제
  //     if (!res.success) return;
  //     setUser(null, null);
  //     console.log(res.message);
  //     toast.success('로그아웃 성공!');
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.error(error);
  //     }
  //   }
  // };

  const handleLogOut = async () => {};

  return (
    <header className="border-b-(--color-light-gray)/30 h-16 w-full border-b px-5">
      <div className="flex h-full items-center justify-between">
        <Link href="/main">
          <h1 className="text-lg font-bold">
            <Image src={Logo} alt="logo" className="size-12" />
          </h1>
        </Link>
        {/* <div className="flex items-center">
          <Button variant="text" className="relative !p-0">
            <IoNotifications className="size-6 text-(--color-accent)" />
            <span className="absolute top-1.5 right-0.5 size-2 rounded-full bg-(--color-red)" />
          </Button>
        </div> */}
        <div className="flex items-center">
          {userInfo ? <button onClick={handleLogOut}>로그아웃</button> : <Link href="/auth/signin">로그인</Link>}
        </div>
      </div>
    </header>
  );
};

export default Header;
