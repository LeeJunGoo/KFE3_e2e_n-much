import { NextResponse } from 'next/server';
import { getUserRole } from 'src/lib/supabase/query/users';

export async function GET() {
  try {
    const res = await getUserRole();
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
