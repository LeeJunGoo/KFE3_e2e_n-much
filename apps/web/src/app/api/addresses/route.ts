import { NextResponse, type NextRequest } from 'next/server';
import { insertAddressInfo, selectAddressInfo } from 'src/entities/address/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const addressId = searchParams.get('addressId');

  if (!addressId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await selectAddressInfo(addressId);
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { user_id, business_name, postal_code, road_address, detail_address, is_default, company_image } =
    await request.json();

  if (!user_id) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const newAddress = await insertAddressInfo({
      user_id,
      business_name,
      postal_code,
      road_address,
      detail_address,
      is_default,
      company_image
    });

    return NextResponse.json({ message: 'success', data: newAddress }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
