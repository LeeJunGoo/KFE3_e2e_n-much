'use client';

import { useEffect, useState } from 'react';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import { deleteUnsubscribeUser, postSubscribeUser } from 'src/entities/notification/serverActions';
import { urlBase64ToUint8Array } from 'src/entities/notification/utils/urlBase64ToUint8Array';
import type { PushSubscriptionProps } from 'src/entities/notification//type';

export const useNotificationSubscription = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDenied, setIsDenied] = useState(false);
  const user = useUserState();

  //브라우저가 서비스 워커와 Push API를 지원하는 지 여부 체크
  useEffect(() => {
    const checkSupport = async () => {
      if (!user) return;

      if ('serviceWorker' in navigator && 'PushManager' in window) {
        await registerServiceWorker();
        await checkCurrentSubscription();
        setIsSupported(true);
      }
    };
    checkSupport();
  }, [user]);

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
    // 권한: 차단일 경우
    if (Notification.permission === 'denied') {
      const localPushState = JSON.parse(localStorage.getItem(`pushSubscription_${user?.id}`)!);

      if (localPushState) {
        await unsubscribe(user!.id, localPushState);
      }

      setIsDenied(true);
      return;
    }

    // 권한: 허용
    if (Notification.permission === 'granted') {
      const isSuccess = await subscribe(user!.id);
      setIsSubscribed(isSuccess);

      return;
    }

    // 권한: default
    if (Notification.permission === 'default') {
      setIsSubscribed(false);
      return;
    }
  };

  const subscribe = async (userId: string) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      //  구독(Subscription) 객체를 생성
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!)
      });

      // 2. 브라우저 로컬 저장소 저장(클라이언트측 관리)
      localStorage.setItem(`pushSubscription_${user?.id}`, JSON.stringify(subscription));

      // 3. 서버에 저장(서버측 관리)
      await postSubscribeUser(userId, subscription.toJSON() as PushSubscriptionProps);

      return true;
    } catch {
      return false;
    }
  };

  const unsubscribe = async (userId: string, deleteSub: PushSubscriptionProps | null) => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      const unsubscription = deleteSub ?? subscription;

      // 1. 구독(Subscription) 객체가 존재하면 수동 삭제
      if (subscription) {
        await subscription.unsubscribe();
      }
      // 2. 브라우저 로컬 저장소 삭제(클라이언트측 관리)
      localStorage.removeItem(`pushSubscription_${user?.id}`);

      // 3. 서버 삭제(서버측 관리)
      await deleteUnsubscribeUser(userId, unsubscription as PushSubscriptionProps);
    } catch {
      return false;
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
