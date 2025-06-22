'use client';

import PageTitle from 'components/common/PageTitle';

export default function SignupPage() {
  const handleSocialSignup = (provider: string) => {
    // 소셜 회원가입 로직
  };

  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <div className="flex flex-col">
        <button onClick={() => handleSocialSignup('google')}>Google로 회원가입</button>
        <button onClick={() => handleSocialSignup('kakao')}>Kakao로 회원가입</button>
      </div>
    </>
  );
}
