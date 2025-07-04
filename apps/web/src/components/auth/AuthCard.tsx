import GoogleLogo from 'assets/logos/google_logo.png';
import KakaoLogo from 'assets/logos/kakao_logo.png';
import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { FaGavel, FaScaleBalanced } from 'react-icons/fa6';
import type { Role } from '../../types/auth/index';

interface AuthCardProps {
  title: string;
  role: Role;
  onTabChange: (role: Role) => void;
  onSocialSignin: (provider: 'google' | 'kakao') => void;
}

export function AuthCard({ title, role, onTabChange, onSocialSignin }: AuthCardProps) {
  return (
    <Card className="w-full gap-0 overflow-hidden p-0 shadow-none">
      <Tabs
        value={role}
        onValueChange={(v: string) => {
          if (v === 'BUYER' || v === 'SELLER') onTabChange(v);
        }}
      >
        <TabsList className="h-11 w-full rounded-none bg-transparent p-0 shadow-lg shadow-[#EEF2FB]">
          <TabsTrigger
            className="relative h-full overflow-hidden rounded-none p-0 before:absolute before:right-0 before:bottom-0 before:h-[3px] before:w-0 before:bg-[#5B80C2] before:transition-all before:duration-300 before:content-[''] data-[state=active]:bg-[#EEF2FB] data-[state=active]:font-semibold data-[state=active]:text-gray-950 data-[state=active]:before:w-full data-[state=inactive]:bg-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
            value="BUYER"
          >
            <FaGavel size={20} /> 입찰 참여자
          </TabsTrigger>
          <TabsTrigger
            className="relative h-full overflow-hidden rounded-none p-0 before:absolute before:bottom-0 before:left-0 before:h-[3px] before:w-0 before:bg-[#5B80C2] before:transition-all before:duration-300 before:content-[''] data-[state=active]:bg-[#EEF2FB] data-[state=active]:font-semibold data-[state=active]:text-gray-950 data-[state=active]:before:w-full data-[state=inactive]:bg-white data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
            value="SELLER"
          >
            <FaScaleBalanced size={20} />
            경매 진행자
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <CardContent className="flex flex-col gap-8 px-8 py-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-center text-2xl font-semibold">{title}</h3>
          <p className="text-center text-gray-600">소셜 계정으로 간편하게 {title}하세요</p>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="default"
            className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            onClick={() => onSocialSignin('google')}
          >
            <Image src={GoogleLogo} alt="GoogleLogo" className="h-5 w-5" />
            <div>Google로 {title}</div>
          </Button>
          <Button
            variant="default"
            className="w-full border-none bg-[#FEE500] text-[#3A1D1D] hover:bg-[#F6DC00]"
            onClick={() => onSocialSignin('kakao')}
          >
            <Image src={KakaoLogo} alt="KakaoLogo" className="h-6 w-6" />
            Kakao로 {title}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
