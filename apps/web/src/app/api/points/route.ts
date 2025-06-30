import { NextRequest, NextResponse } from 'next/server';
import { getUserPointTransactions, createPointTransaction } from '../../../lib/supabase/query/points';
import { createClient } from 'src/lib/supabase/client/server';

export async function GET() {
  try {
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다');
    }

    const res = await getUserPointTransactions(user.id);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { type, amount, balance, title, description } = await request.json();

  if (!type || !amount || !balance || !title) {
    return NextResponse.json({ message: 'type, amount, balance, title 값이 필요합니다.' }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다');
    }

    const res = await createPointTransaction(user.id, type, amount, balance, title, description);
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
