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

  // 2. code 파라미터가 URL에 붙었을 때: (회원가입 성공 직후)
  useEffect(() => {
    const storeUserInfo = async () => {
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log(user);
        // 내 users 테이블에 데이터 upsert (id는 supabase user id)
        const { error } = await supabase
          .from("users")
          .upsert([{
            user_id: user.id,
            email: user.email ?? "",
            nickname: user.user_metadata?.name ?? "",
            avatar: user.user_metadata?.avatar_url ?? null,
            created_at: user.created_at ?? new Date().toISOString(),
            updated_at: user.updated_at ?? new Date().toISOString(),
            password: "", // 소셜가입이므로 빈값 허용 (아예 안 쓰려면 null 가능하게 테이블 구조 변경 필요)
            point: 0,
            role: "SELLER",
            favorites: [],
          }]);
        if (error) {
          alert("사용자 정보 저장에 실패했습니다: " + error.message);
        }
      }
    };

    // 회원가입 직후 code가 있으면 upsert 진행!
    if (searchParams.get("code")) {
      storeUserInfo().then(() => {
        // 회원정보 upsert가 끝나면 홈으로 이동, code 쿼리도 같이 정리!
        router.replace("/");
      });
    }
  }, [router, searchParams, supabase]);

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