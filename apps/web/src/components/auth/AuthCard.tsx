// import Logo from 'assets/google_logo.png';
// import Image from 'next/image';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardContent } from '@repo/ui/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';

interface AuthCardProps {
  title: string;
  onTab1: () => void;
  onTab2: () => void;
  onSocialSignup: (provider: 'google' | 'kakao') => void;
}

export function AuthCard({ title, onTab1, onTab2, onSocialSignup }: AuthCardProps) {
  return (
    <div className="flex justify-center items-center">
      {/* <Image src={Logo} alt="Logo" /> */}
      <Card className="max-w-sm rounded-md overflow-hidden p-0 shadow-lg border-none gap-0">
        <Tabs defaultValue="buyer">
          <TabsList className="w-full bg-transparent rounded-none h-12 p-0">
            <TabsTrigger
              className="rounded-none p-0 h-full data-[state=active]:bg-[#8E74F9] data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
              value="buyer"
              onClick={onTab1}
            >
              입찰 참여자
            </TabsTrigger>
            <TabsTrigger
              className="rounded-none p-0 h-full data-[state=active]:bg-[#8E74F9] data-[state=active]:text-white data-[state=inactive]:bg-gray-100 data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:bg-gray-200"
              value="seller"
              onClick={onTab2}
            >
              경매 진행자
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <CardContent className="flex flex-col gap-8 px-8 py-10">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold text-center">{title}</h3>
            <p className="text-gray-600 text-center">소셜 계정으로 간편하게 {title}하세요</p>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="default"
              className="w-full bg-white text-gray-700 border border-gray-300  hover:bg-gray-50"
              onClick={() => onSocialSignup('google')}
            >
              Google로 회원가입
            </Button>
            <Button
              variant="default"
              className="w-full bg-[#FEE500] text-[#3A1D1D] border-none hover:bg-[#F6DC00]"
              onClick={() => onSocialSignup('kakao')}
            >
              Kakao로 회원가입
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
