'use client';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../../../assets/images/logo.svg';
// import { IoNotifications } from 'react-icons/io5';
// import { Button } from '@repo/ui/components/ui/button';

const Header = () => {
  return (
    <header className="h-16 w-full border-b border-b-(--color-light-gray)/30 px-5">
      <div className="flex h-full items-center justify-between">
        <Link href="/">
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
          <Link href="/auth/signin">로그인</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
