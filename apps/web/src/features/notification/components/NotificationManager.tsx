'use client';

import { useEffect, useState } from 'react';
import {
  sendNotification,
  type SimplePushSubscription,
  subscribeUser,
  unsubscribeUser
} from 'src/entities/notification/serverActions';

const NotificationManger = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');

  // 컴포넌트 초기 로드 시점: 브라우저가 서비스 워커와 Push API를 지원하는지 확인
  useEffect(() => {
    const init = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        setIsSupported(true);
        await registerServiceWorker();
        await subscribeToPush();
      }
    };

    init();
  }, []);

  // sw.js 파일을 서비스 워커로 등록
  const registerServiceWorker = async () => {
    try {
      await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      console.log('Service Worker registered successfully.');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  // 알림 권한 요청
  const subscribeToPush = async () => {
    if (!process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
      console.error('VAPID public key is not defined.');
      return;
    }
    try {
      const registration = await navigator.serviceWorker.ready;

      //  구독(Subscription) 객체를 생성
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
      });

      setSubscription(sub);

      await subscribeUser(sub.toJSON() as SimplePushSubscription);
      console.log('Subscribed to push notifications.');
    } catch (error) {
      // 알림 권한 차단 시 전달 되는 문구(추후 삭제 예정)
      console.error('Failed to subscribe to push notifications:', error);
    }
  };

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  // 구독 취소
  const unsubscribeFromPush = async () => {
    if (!subscription) return;
    try {
      await subscription.unsubscribe();
      setSubscription(null);
      await unsubscribeUser();
      console.log('Unsubscribed from push notifications.');
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  // 알림 전송
  const sendTestNotification = async () => {
    if (!subscription) {
      console.error('Not subscribed, cannot send notification.');
      return;
    }
    try {
      await sendNotification(message);
      setMessage('');
    } catch (error) {
      console.error('Failed to send notification:', error);
    }
  };

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <div>
            <input
              type="text"
              placeholder="Enter notification message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendTestNotification}>Send Test</button>
          </div>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
};

export default NotificationManger;
