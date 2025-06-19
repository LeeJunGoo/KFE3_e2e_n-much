import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from './ui/card';
import { Button } from './ui/button';
import PageTitle from './typography/PageTitle';

type Role = 'BUYER' | 'SELLER';

interface AuthCardProps {
  title: string;
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  handleSocialSignup: (provider: 'google' | 'kakao') => void;
}

export function AuthCard({ title, setRole, handleSocialSignup }: AuthCardProps) {
  return (
    <>
      <Card className="max-w-sm">
        <CardHeader className="">
          <Tabs defaultValue="buyer">
            <TabsList>
              <TabsTrigger className="bg-fuchsia-800" value="buyer" onClick={() => setRole('BUYER')}>
                입찰 참여자
              </TabsTrigger>
              <TabsTrigger value="seller" onClick={() => setRole('SELLER')}>
                경매 진행자
              </TabsTrigger>
            </TabsList>
            <TabsContent value="buyer"></TabsContent>
            <TabsContent value="seller"></TabsContent>
          </Tabs>
        </CardHeader>
        <CardContent className="p-8">
          <PageTitle>{title}</PageTitle>
          <CardDescription className="text-gray-600 text-center mt-8">
            소셜 계정으로 간편하게 로그인하세요
          </CardDescription>
        </CardContent>
        <CardFooter className="flex-col gap-2 p-8">
          <Button
            variant="default"
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            onClick={() => handleSocialSignup('google')}
          >
            Google로 회원가입
          </Button>
          <Button
            variant="default"
            className="w-full bg-amber-400 text-amber-950 hover:bg-gray-800"
            onClick={() => handleSocialSignup('kakao')}
          >
            Kakao로 회원가입
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
