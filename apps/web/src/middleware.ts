import { NextResponse } from 'next/server';
import { getServerUser, selectUserIdByAuctionId } from 'src/entities/auth/serverAction';
import type { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const { searchParams } = request.nextUrl;

  //NOTE - 로그인한 경우, 메인 페이지로 이동
  if (pathName === '/') {
    const userInfo = await getServerUser();
    if (userInfo) {
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }

  //NOTE - 경매 등록/수정 페이지에서 로그인되어 있지 않으면 로그인 페이지로 이동
  if (pathName === '/auctions/write') {
    const auctionId = searchParams.get('auction_id')?.trim();
    const userInfo = await getServerUser();

    //NOTE - 로그인 안 한 경우, 로그인 페이지로 이동
    if (!userInfo) {
      return NextResponse.redirect(new URL('/auth/signup', request.url));
    }

    //NOTE - 등록 페이지인 경우, 경매 등록 페이지로 이동
    if (!auctionId) {
      return NextResponse.rewrite(request.url);
    }

    //NOTE - 수정 페이지의 작성자가 로그인한 유저가 아닌 경우 메인 페이지로 이동
    try {
      const userId = userInfo.id;
      const authorId: string = await selectUserIdByAuctionId(auctionId);

      if (authorId !== userId) {
        return NextResponse.redirect(new URL('/main', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/main', request.url));
    }
  }

  if (pathName === '/auctions') {
    const order = searchParams.get('order')?.trim();
    const keyword = searchParams.get('keyword')?.trim();
    const orderList = ['end_date', 'favorites', 'created_at'];
    let isUrlChanged = false;

    //NOTE - order 값이 없거나 카테고리에 없으면 end_date로 변경
    if (!order || !orderList.includes(order)) {
      searchParams.set('order', 'end_date');
      isUrlChanged = true;
    }

    //NOTE - keyword가 없으면 keyword 쿼리 스트링 제거
    if (!keyword) {
      searchParams.delete('keyword');
    }

    //NOTE - url이 바뀌지 않으면 원래 url로 이동
    if (!isUrlChanged) {
      return NextResponse.next();
    }

    return NextResponse.redirect(request.nextUrl);
  }
  return NextResponse.next();
};
