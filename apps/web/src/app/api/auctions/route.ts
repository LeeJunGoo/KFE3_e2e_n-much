//FIXME - status 하드 코딩 수정하기
//NOTE - status 빼는 것 의논해보기, 만약 뺀다면 DB 데이터만 보내도 좋을 것 같음

import { NextResponse } from 'next/server';
import {
  addAuction,
  deleteAuction,
  getAllAuctions,
  getAuction,
  getSellerAuctions,
  updateAuction
} from 'src/entities/auction/supabase';
import { createClient } from 'src/shared/supabase/client/server';
import type { NextRequest } from 'next/server';
import type { AuctionInsert, AuctionUpdate } from 'src/shared/supabase/types';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const auctionId = searchParams.get('auction_id');
  const type = searchParams.get('type');

  try {
    // 특정 경매 조회
    if (auctionId) {
      const res = await getAuction(auctionId);
      return NextResponse.json({ status: 'success', data: res });
    }

    // 셀러 경매 목록 조회
    if (type === 'sellerAuctions') {
      const supabase = await createClient();
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('로그인된 사용자가 없습니다');
      }
      const res = await getSellerAuctions(user.id);
      return NextResponse.json({ status: 'success', data: res });
    }

    // 전체 경매 조회
    const res = await getAllAuctions();
    return NextResponse.json({ status: 'success', data: res });
  } catch (error) {
    return NextResponse.json({ status: 'error', error: `Server Error${error}` }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const auctionData: AuctionInsert = await request.json();

  try {
    const res = await addAuction(auctionData);
    return NextResponse.json({ status: 'success', data: res }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
  }
}

export async function PATCH(request: NextRequest) {
  const auctionData: AuctionUpdate = await request.json();

  try {
    const res = await updateAuction(auctionData.auction_id, auctionData);
    return NextResponse.json({ status: 'success', data: res }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: NextRequest) {
  const { auction_id: auctionId } = await request.json();

  if (!auctionId) {
    return NextResponse.json({ status: 'error', message: 'auction_id 값이 존재하지 않습니다.' }, { status: 400 });
  }

  try {
    const res = await deleteAuction(auctionId);
    return NextResponse.json({ status: 'success', data: res }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: 'error', error: error.message }, { status: 500 });
    }
  }
}
