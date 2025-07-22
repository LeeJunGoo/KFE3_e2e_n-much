import { NextResponse } from 'next/server';
import { getServerUser } from 'src/entities/auth/serverAction';
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

  //NOTE - 경매 수정페이지에서 로그인되어 있지 않으면 로그인 페이지로 이동
  if (pathName === '/auctions/write' && searchParams.get('auction_id')) {
    const userInfo = await getServerUser();
    if (!userInfo) {
      return NextResponse.redirect(new URL('/auth/signup', request.url));
    }
  }

  if (pathName === '/auctions' && !searchParams.get('order')) {
    return NextResponse.redirect(new URL('/auctions?order=end_date', request.url));
  }

  return NextResponse.rewrite(request.url);
};
