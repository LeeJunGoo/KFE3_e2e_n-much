import { NextResponse, type NextRequest } from 'next/server';
import { selectAddressId } from 'src/entities/auction/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await selectAddressId(userId);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
    }
  }
}
