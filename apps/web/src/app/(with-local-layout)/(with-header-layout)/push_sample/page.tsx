'use client';

import { useCallback, useEffect } from 'react';
import OneSignal from 'react-onesignal';
import type {
  NotificationClickEvent,
  NotificationDismissEvent,
  NotificationForegroundWillDisplayEvent
} from 'react-onesignal';

const page = () => {
  useEffect(() => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_SAFARI_WEB_ID!,
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

  return <>sample</>;
};

export default page;
