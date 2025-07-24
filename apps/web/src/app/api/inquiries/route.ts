import { NextResponse, type NextRequest } from 'next/server';
import { insertInquiry, selectInquiryInfo } from 'src/entities/inquiry/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const inquiryId = searchParams.get('inquiryId');
  const auctionId = searchParams.get('auctionId');
  const type = searchParams.get('type');
  let res;

  if (!auctionId || !inquiryId) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    if (type === 'existing') {
      res = await selectInquiryInfo(inquiryId);
    }

    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { auctionId, userId, title, description } = await request.json();

  if (!auctionId || !userId || !title || !description) {
    return NextResponse.json({ error: '400: 필수 값이 존재하지 않습니다.' }, { status: 400 });
  }
  try {
    await insertInquiry({ auctionId, userId, title, description });
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: '500: 서버 처리 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
