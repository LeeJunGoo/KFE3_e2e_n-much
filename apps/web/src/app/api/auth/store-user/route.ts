import { NextResponse } from 'next/server';
import { storeUserInfo } from 'src/shared/supabase/query/users';

export async function POST(request: Request) {
  try {
    const { role } = await request.json();
    const res = await storeUserInfo(role);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
