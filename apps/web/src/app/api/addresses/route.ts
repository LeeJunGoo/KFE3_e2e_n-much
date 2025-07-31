import { NextResponse, type NextRequest } from 'next/server';
import { insertAddressInfo, selectDefaultAddress } from 'src/entities/addresses/supabase';

// 기본주소 조회
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const user_id = searchParams.get('user_id');

  if (!user_id) {
    return NextResponse.json({ error: '유저 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const res = await selectDefaultAddress(user_id);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error ${error}` }, { status: 500 });
  }
}

// 주소 등록
export async function POST(request: NextRequest) {
  try {
    const { user_id, business_name, postal_code, road_address, detail_address, company_image } = await request.json();

    // user_id 필수 체크
    if (!user_id) {
      return NextResponse.json({ error: '유저 ID가 필요합니다.' }, { status: 400 });
    }

    // 기본주소니까 is_default는 true 고정
    const newAddress = await insertAddressInfo({
      user_id,
      business_name,
      postal_code,
      road_address,
      detail_address,
      is_default: false,
      company_image
    });

    return NextResponse.json({ message: 'success', data: newAddress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error ${error}` }, { status: 500 });
  }
}
