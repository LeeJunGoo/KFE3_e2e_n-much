import { type User } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { selectAuthInfo } from 'src/entities/auth/supabase';

//ANCHOR - 현재 사용 x
export async function GET() {
  try {
    const user: User | null = await selectAuthInfo();
    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
