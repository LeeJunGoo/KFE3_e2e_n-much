import { useEffect } from 'react';
import OneSignal from 'react-onesignal';

const page = () => {
  useEffect(() => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_APP_ID!,
      safari_web_id: process.env.NEXT_PUBLIC_SAFARI_WEB_ID!,
      allowLocalhostAsSecureOrigin: true //NOTE - 개발자 모드(localhost 사용 가능)
    });
  }, []);
  return <>sample</>;
};

export default page;
