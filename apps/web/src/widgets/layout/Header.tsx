import Image from 'next/image';
import Link from 'next/link';
import Logo from 'src/assets/images/logo.svg';
import NotificationButton from 'src/features/notification/components/NotificationButton';

const Header = () => {
  return (
    <header className="border-b-(--color-warm-gray)/30 h-16 w-full border-b px-5">
      <div className="flex h-full items-center justify-between">
        <Link href="/main">
          <h1 className="text-lg font-bold">
            <Image src={Logo} alt="logo" className="size-12" />
          </h1>
        </Link>
        <NotificationButton />
      </div>
    </header>
  );
};

export default Header;
