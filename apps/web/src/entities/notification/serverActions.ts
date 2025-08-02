'use server';

import webpush from 'web-push';

// 순수한 데이터 형태의 타입을 직접 정의
export interface SimplePushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

webpush.setVapidDetails(
  'mailto:jepjepghost@gmail.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

// 데이터베이스 대신 임시로 구독 정보를 저장할 변수
let subscription: SimplePushSubscription | null = null;

export const subscribeUser = async (sub: SimplePushSubscription) => {
  subscription = sub;

  return { success: true };
};

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
