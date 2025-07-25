'use client';

import { useCallback, useEffect } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import OneSignal from 'react-onesignal';
import type {
  NotificationClickEvent,
  NotificationDismissEvent,
  NotificationForegroundWillDisplayEvent
} from 'react-onesignal';

const Page = () => {
  useEffect(() => {
    //NOTE - 아래 초기화 과정을 통해서 oneSignal 앱에 자동으로 가입함
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_APP_ID!, //NOTE - 대시 보드 참조
      safari_web_id: 'web.onesignal.auto.18427476-d96c-4d38-9e88-40d33a9d693d',
      allowLocalhostAsSecureOrigin: true, //NOTE - 개발자 모드(localhost 사용 가능)
      welcomeNotification: { title: '환영 인사', message: '환영합니다.' }, //NOTE - 환영 알림
      webhooks: {
        //NOTE - cors 정책 끔 (공식 문서 권장 사항)
        cors: false,
        //NOTE - clicked 이벤트(내용이나 제목 클릭)가 발동하면, 아래 url로 post 요청 보내고 알림 내용 전달 받음
        'notification.clicked': 'http://localhost:3001/api/webhook/clicked',
        //NOTE - willDisplay 이벤트(알림이 화면에 보이기 전에 먼저 발생)가 발동하면, 아래 url로 post 요청 보내고 알림 내용 전달 받음
        'notification.willDisplay': 'http://localhost:3001/api/webhook/display',
        //NOTE - willDisplay 이벤트(알림을 종료)가 발동하면, 아래 url로 post 요청 보내고 알림 내용 전달 받음
        'notification.dismissed': 'http://localhost:3001/api/webhook/dismiss'
      }
    }).then(() => {
      OneSignal.Debug.setLogLevel('trace'); //NOTE - 디버깅 용도
    });
    //NOTE - 클릭 이벤트(내용이나 제목 클릭) 리스너
    OneSignal.Notifications.addEventListener('click', clickEvent);
    //NOTE - 화면 출력 이벤트(알림이 화면에 보이기 전에 먼저 발생) 리스너
    OneSignal.Notifications.addEventListener('foregroundWillDisplay', foreEvent);
    //NOTE - 알림 종료 이벤트(알림을 종료) 리스너
    OneSignal.Notifications.addEventListener('dismiss', dismissEvent);

    return () => {
      OneSignal.Notifications.removeEventListener('click', clickEvent);
      OneSignal.Notifications.removeEventListener('foregroundWillDisplay', foreEvent);
      OneSignal.Notifications.removeEventListener('dismiss', dismissEvent);
    };
  }, []);

  //NOTE - e는 이벤트와 알림 내용을 가지고 있음
  const clickEvent = useCallback((e: NotificationClickEvent) => {
    alert(`click`);
  }, []);

  //NOTE - e는 이벤트와 알림 내용을 가지고 있음
  const dismissEvent = useCallback((e: NotificationDismissEvent) => {
    alert(`dismiss`);
  }, []);

  //NOTE - e는 이벤트와 알림 내용을 가지고 있음
  const foreEvent = useCallback((e: NotificationForegroundWillDisplayEvent) => {
    alert(`fore`);
  }, []);

  return (
    <>
      <div>sample</div>
      <Button
        onClick={async () => {
          try {
            const res = await fetch('https://api.onesignal.com/notifications', {
              headers: {
                'Content-Type': 'application/json',
                //NOTE - API키 생성해서 넣어야 함 (대시 보드에 있음)
                Authorization: `${process.env.NEXT_PUBLIC_API_KEY}`
                //NOTE - thunder client로 보내면 정상작동 (CORS 정책때문에 안 돼는듯....)
                // charset: 'utf-8'
              },
              method: 'POST',
              body: JSON.stringify({
                //NOTE - 대시 보드 참조
                app_id: `${process.env.NEXT_PUBLIC_APP_ID}`,
                //NOTE - push 알림
                target_channel: 'push',
                //NOTE - 알림 이름
                name: 'Testing basic setup',
                //NOTE - 알림 제목
                headings: {
                  en: 'hello~'
                },
                //NOTE - 알림 내용
                contents: {
                  en: 'hello world!'
                },
                //NOTE - 세그먼트를 설정하면 세그먼트에 해당하는 사용자에게만 알람 보내기 가능 (채팅 방이랑 비슷함)
                included_segments: ['Total Subscriptions'],
                //NOTE - 알림에 이미지 넣을 수 있음
                chrome_web_image: 'https://avatars.githubusercontent.com/u/11823027?s=200&v=4'
              })
            });
            const data = await res.json();
            console.log('data', data);
          } catch (error) {
            alert('error');
            console.error(error);
          }
        }}
      >
        push 알림 보내기
      </Button>
    </>
  );
};

export default Page;
