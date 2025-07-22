import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const pathName = request.nextUrl.pathname;
  const { searchParams } = request.nextUrl;

  if (pathName.startsWith('/auctions') && !searchParams.get('order')) {
    return NextResponse.redirect(new URL('/auctions?order=end_date', request.url));
  }

  return NextResponse.rewrite(request.url);
};

// 아래 "Matching Paths"를 참조하여 자세히 알아보세요
export const config = {
  matcher: ['/auctions']
};
