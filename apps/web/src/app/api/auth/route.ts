import { createClient } from 'src/shared/supabase/client/server'; // SSR 전용

//NOTE - 서버측에서만 사용 가능
export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    return user;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}
