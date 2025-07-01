import GoogleLogo from 'assets/logos/google_logo.png';
import KakaoLogo from 'assets/logos/kakao_logo.png';
import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { Role } from '../../types/auth/index';

interface AuthCardProps {
  title: string;
  role: Role;
  onTabChange: (role: Role) => void;
  onSocialSignin: (provider: 'google' | 'kakao') => void;
}

export function AuthCard({ title, role, onTabChange, onSocialSignin }: AuthCardProps) {
  return (
    <Card className="max-w-sm gap-0 overflow-hidden rounded-md border-none p-0 shadow-lg">
      <Tabs
        value={role}
        onValueChange={(v: any) => {
          if (v === 'BUYER' || v === 'SELLER') onTabChange(v);
        }}
      >
        <TabsList className="h-12 w-full rounded-none bg-transparent p-0">
          <TabsTrigger
            className="h-full rounded-none p-0 data-[state=active]:bg-[#8E74F9] data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
            value="BUYER"
          >
            입찰 참여자
          </TabsTrigger>
          <TabsTrigger
            className="h-full rounded-none p-0 data-[state=active]:bg-[#8E74F9] data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
            value="SELLER"
          >
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
