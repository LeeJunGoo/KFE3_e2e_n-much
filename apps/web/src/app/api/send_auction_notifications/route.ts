import { createClient } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import webpush from 'web-push';

export async function POST(req: NextRequest) {
  // VAPID 키 설정
  webpush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  try {
    const body = await req.json();
    const { record: ended_auction } = body;

    const user_ids = ended_auction?.participant_ids;
    const auctionStatus = ended_auction.status;
    const item_title = ended_auction?.title;

    // 'ended'로 바뀐 게 아니거나, 이미 'ended'였다면 알림을 보낼 필요가 없습니다.
    if (auctionStatus !== 'CLOSED' || auctionStatus === 'OPEN') {
      return NextResponse.json({ message: 'Event ignored: Not an auction completion.' }, { status: 200 });
    }

    if (!user_ids || user_ids.length === 0) {
      return NextResponse.json({ message: 'No users to notify.' }, { status: 200 });
    }

    // Supabase admin client 생성
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

    // 구독 정보 가져오기
    const { data: subscriptions, error } = await supabaseAdmin.from('users').select('subscription').in('id', user_ids);

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const payload = JSON.stringify({
      title: '경매 종료 알림 🔔',
      body: `'${item_title}' 경매가 마감되었습니다. 지금 결과를 확인하세요!`
    });

    for (const user of subscriptions ?? []) {
      const sub = user.subscription;
      if (!sub?.endpoint || !sub?.keys?.p256dh || !sub?.keys?.auth) continue;

      try {
        await webpush.sendNotification(sub, payload);
      } catch (err) {
        console.error('푸시 실패:', err);
        // TODO: 410 Gone 처리 시 DB에서 삭제할 수도 있음
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('예외 발생:', e);
    if (e instanceof Error) return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
