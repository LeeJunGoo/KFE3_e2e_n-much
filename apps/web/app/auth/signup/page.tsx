"use client";
import { useEffect } from 'react';
import { createClient } from '@repo/ui/utils/supabase/client/client';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import PageTitle from '@repo/ui/components/typography/PageTitle';

export default function SignupPage() {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSocialSignup = async (provider: "google" | "kakao") => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        // scopes: "email profile",
        redirectTo: "http://localhost:3001/auth/signup",
      }
    });
  };

  useEffect(() => {
    if (searchParams.get("code")) {
      // 쿼리 파라미터 code 삭제
      router.replace("/");
    }
  }, [router, searchParams]);

  return (
    <>
      <PageTitle>회원가입</PageTitle>
      <div className="flex flex-col">
        <button onClick={() => handleSocialSignup("google")}>Google로 회원가입</button>
        <button onClick={() => handleSocialSignup("kakao")}>Kakao로 회원가입</button>
      </div>
    </>
  );
}