import { NextRequest, NextResponse } from 'next/server';
import { createClient } from 'src/lib/supabase/client/server';
import { BuyerRow, SellerRow } from 'src/lib/supabase/type';

export type UserInfoType = SellerRow & BuyerRow & { role: string };

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = await request.nextUrl.searchParams;
  let userId = searchParams.get('user_id');

  if (!userId) {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('로그인된 사용자가 없습니다.');
    }
    userId = user.id;
  }

  try {
    // 바이어 정보 확인
    const { data: buyerData } = await supabase.from('buyers').select('*').eq('buyer_id', userId).maybeSingle();

    if (buyerData) {
      return NextResponse.json({ status: 'success', data: { role: 'BUYER', ...buyerData } });
    }

    // 셀러 정보 확인
    const { data: sellerData } = await supabase.from('sellers').select('*').eq('seller_id', userId).maybeSingle();

    if (sellerData) {
      return NextResponse.json({ status: 'success', data: { role: 'SELLER', ...sellerData } });
    }

    return NextResponse.json({ status: 'error', data: null });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: 'Server Error: ' + error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 'error', error: 'Server Error: Unknown error' }, { status: 500 });
  }
}
