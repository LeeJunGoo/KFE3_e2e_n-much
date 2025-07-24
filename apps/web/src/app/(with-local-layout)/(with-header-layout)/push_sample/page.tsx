import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

const page = () => {
  useEffect(() => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_SAFARI_WEB_ID!,
      allowLocalhostAsSecureOrigin: true, //NOTE - 개발자 모드(localhost 사용 가능)
      welcomeNotification: { title: '환영 인사', message: '환영합니다.' }, //NOTE - 환영 알림
      webhooks: {
        cors: false,
        'notification.clicked': 'http://localhost:3001/api/webhook/clicked',
        'notification.willDisplay': 'http://localhost:3001/api/webhook/display',
        'notification.dismissed': 'http://localhost:3001/api/webhook/dismiss'
      }
    });
  }, []);
  return <>sample</>;
};

export default page;
