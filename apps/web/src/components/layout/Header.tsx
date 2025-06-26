import Image from 'next/image';
import React from 'react';
import { IoNotifications } from 'react-icons/io5';
import Logo from '../../../assets/images/logo.svg';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="h-16 w-full border-b border-b-(--color-light-gray)/30 px-5">
      <div className="flex h-full items-center justify-between">
        <Link href="/">
          <h1 className="text-lg font-bold">
            <Image src={Logo} alt="logo" className="size-12" />
          </h1>
        </Link>
        <div className="flex items-center">
          <button className="relative">
            <IoNotifications size={24} className="text-(--color-accent)" />
            <span className="absolute top-0 right-0.5 size-2 rounded-full bg-(--color-red)" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
