'use client';

import { useEffect, useState } from 'react';
import { toast } from '@repo/ui/components/ui/sonner';
import { subscribeUser, unsubscribeUser } from 'src/entities/notification/serverActions';
import { urlBase64ToUint8Array } from 'src/entities/notification/utils/urlBase64ToUint8Array';
import type { PushSubscriptionProps } from 'src/entities/notification//type';

export const useNotificationSubscription = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDenied, setIsDenied] = useState(false);

  //브라우저가 서비스 워커와 Push API를 지원하는 지 여부 체크
  useEffect(() => {
    const checkSupport = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        await registerServiceWorker();
        await checkCurrentSubscription();
        setIsSupported(true);
      }
    };
    checkSupport();
  }, []);

  // sw.js 파일을 서비스 워커로 등록
  const registerServiceWorker = async () => {
    try {
      await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    } catch (e) {
      console.error('SW registration failed', e);
    }
  };

  // 유저의 구독 여부
  const checkCurrentSubscription = async () => {
    if (Notification.permission === 'denied') {
      setIsDenied(true);
      return;
    }

    if (Notification.permission === 'granted') {
      setIsSubscribed(true);
      return;
    }
  };

  const subscribe = async (userId: string) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      //  구독(Subscription) 객체를 생성
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
      });

      // 구독 정보 서버에 전송
      await subscribeUser(userId, sub.toJSON() as PushSubscriptionProps);
      return true;
    } catch {
      toast.info('알림 구독을 취소하셨습니다.');
      return false;
    }
  };

  const unsubscribe = async () => {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      setIsSubscribed(false);
      await unsubscribeUser();
    }
  };

  return {
    isSupported, // 지원 여부
    isDenied, // 차단 여부
    isSubscribed, // 구독 여부
    subscribe, // 구독 이벤트 핸들러
    unsubscribe // 구독 취소 이벤트 핸들러
  };
};
