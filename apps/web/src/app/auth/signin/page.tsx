'use client';

import PageTitle from 'src/components/common/PageTitle';

export default function SigninPage() {
  const handleSocialSignin = (provider: string) => {
    // 소셜 로그인 로직
  };

  return (
    <>
      <PageTitle>로그인</PageTitle>
      <div className="flex flex-col">
        <button onClick={() => handleSocialSignin('google')}>Google로 로그인</button>
        <button onClick={() => handleSocialSignin('kakao')}>Kakao로 로그인</button>
      </div>
    </>
  );
}
