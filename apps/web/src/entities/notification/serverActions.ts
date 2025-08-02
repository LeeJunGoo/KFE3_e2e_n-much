'use server';

import { UpdateUserSubscription } from 'src/entities/notification//supabase';
import webpush from 'web-push';
import type { PushSubscriptionProps } from './type';

webpush.setVapidDetails(
  'mailto:jepjepghost@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// 데이터베이스 대신 임시로 구독 정보를 저장할 변수
let subscription: PushSubscriptionProps | null = null;

//ANCHOR - 사용자 구독 업데이트
export const subscribeUser = async (userId: string, sub: PushSubscriptionProps) => {
  await UpdateUserSubscription(userId, sub);

  return { success: true };
};

//FIXME - 사용자 구독 삭제
export const unsubscribeUser = async () => {
  subscription = null;

  return { success: true };
};

export const sendNotification = async (message: string) => {
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
