import { NextResponse } from 'next/server';
import { selectKeyword, selectPopularKeywords, insertKeyword, updateKeyword } from 'src/entities/search/supabase';
import type { NextRequest } from 'next/server';

export async function GET() {
  try {
    const popularKeywords = await selectPopularKeywords();
    return NextResponse.json({ status: 'success', data: popularKeywords });
  } catch (error) {
    const message = error instanceof Error ? error.message : '서버 오류가 발생했습니다.';
    console.error(`[API/KEYWORDS] GET - ${message}`);
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { keyword } = await request.json();

    if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
      return NextResponse.json({ status: 'error', message: '유효하지 않은 키워드입니다.' }, { status: 400 });
    }

    const trimmedKeyword = keyword.trim();
    const existingKeyword = await selectKeyword(trimmedKeyword);

    if (existingKeyword) {
      // 키워드가 존재하면 count를 1 증가
      await updateKeyword(existingKeyword.keyword_id, {
        count: (existingKeyword.count || 0) + 1
      });
    } else {
      // 키워드가 없으면 추가
      await insertKeyword(trimmedKeyword);
    }

    return NextResponse.json({ status: 'success', message: '키워드가 성공적으로 저장되었습니다.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : '서버 오류가 발생했습니다.';
    console.error(`[API/KEYWORDS] POST - ${message}`);
    return NextResponse.json({ status: 'error', message }, { status: 500 });
  }
}
