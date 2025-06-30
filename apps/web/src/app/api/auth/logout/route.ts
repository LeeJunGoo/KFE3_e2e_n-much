import { NextResponse } from 'next/server';
import { getAuthLogout } from 'src/lib/supabase/query/auth';

export async function POST() {
  try {
    const res = await getAuthLogout();
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
