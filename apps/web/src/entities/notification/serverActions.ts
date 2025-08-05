'use server';

import { selectUserSubscription, UpdateUserSubscription } from 'src/entities/notification//supabase';
import webpush from 'web-push';
import type { PushSubscriptionProps } from './type';

//ANCHOR - 기존 구독 정보를 가져와 새 구독 정보를 추가
export const postSubscribeUser = async (userId: string, newSub: PushSubscriptionProps) => {
  // 1. 현재 사용자의 기존 구독 정보를 가져옴
  const userData = await selectUserSubscription(userId);

  // 2. 기존 구독 정보가 배열이 아니거나 null이면 빈 배열로 초기화
  const existingSubscriptions = Array.isArray(userData?.subscription) ? userData.subscription : [];

  // 3. 배열에서 유효한 PushSubscription 객체만 필터링
  const validSubscriptions = existingSubscriptions.filter(
    (sub) => sub !== null && typeof sub === 'object' && 'endpoint' in sub && 'keys' in sub
  ) as unknown as PushSubscriptionProps[];

  // 4. 중복 구독인지 확인 (endpoint 주소 기준)
  const isDuplicate = validSubscriptions.some((sub) => sub.endpoint === newSub.endpoint);

  if (isDuplicate) return;

  // 5. 새 구독 정보를 추가
  const updatedSubscriptions = [...validSubscriptions, newSub];

  const data = await UpdateUserSubscription(userId, updatedSubscriptions);

  return data;
};

// 사용자 구독 삭제
export const deleteUnsubscribeUser = async (userId: string, unSub: PushSubscriptionProps) => {
  // 1. 현재 사용자의 기존 구독 정보를 가져옴
  const userData = await selectUserSubscription(userId);

  // 2. 기존 구독 정보가 배열이 아니거나 null이면 빈 배열로 초기화
  const existingSubscriptions = Array.isArray(userData?.subscription) ? userData.subscription : [];

  // 3. 배열에서 유효한 데이터 타입 필터링 및 삭제할 데이터를 제외한 새로운 배열 생성
  const updatedSubscriptions = existingSubscriptions.filter(
    (sub) =>
      sub !== null && typeof sub === 'object' && 'endpoint' in sub && 'keys' in sub && sub.endpoint !== unSub.endpoint
  ) as unknown as PushSubscriptionProps[];

  // 4. 새 구독 정보로 변경
  await UpdateUserSubscription(userId, updatedSubscriptions);

  return { success: true };
};

//ANCHOR - 추후, cronJob 등의 기능 없이 버튼 클릭 등의 클라이언트 내에서 알림을 보내야할 경우 사용
export const sendNotification = async (message: string, subscription: PushSubscriptionProps) => {
  webpush.setVapidDetails(
    'mailto:jepjepghost@gmail.com',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
  );

  if (!subscription) {
    throw new Error('No subscription available');
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: 'Test Notification',
        body: message,
        icon: '/web_app_manifest_192.png'
      })
    );
    return { success: true };
  } catch (error) {
    console.error('Error sending push notification:', error);
    return { success: false, error: 'Failed to send notification' };
  }
};
