import { NextResponse, type NextRequest } from 'next/server';
import { selectAddressId } from 'src/entities/auction/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const userId = searchParams.get('user_id');

  try {
    if (userId) {
      const res = await selectAddressId(userId);
      return NextResponse.json(res, { status: 200 });
    }

    return NextResponse.json({ message: '잘못된 정보를 전달하였습니다.' }, { status: 400 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}
