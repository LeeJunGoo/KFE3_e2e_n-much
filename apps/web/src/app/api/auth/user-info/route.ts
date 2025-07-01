import { NextResponse } from 'next/server';
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

    const userId = user.id;

    // 바이어 정보 확인
    const { data: buyerData } = await supabase.from('buyers').select('*').eq('buyer_id', userId).maybeSingle();

    if (buyerData) {
      return NextResponse.json({ status: 'success', data: { role: 'BUYER', userInfo: buyerData } });
    }

    // 셀러 정보 확인
    const { data: sellerData } = await supabase.from('sellers').select('*').eq('seller_id', userId).maybeSingle();

    if (sellerData) {
      return NextResponse.json({ status: 'success', data: { role: 'SELLER', userInfo: sellerData } });
    }

    return NextResponse.json({ status: 'success', data: null });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
