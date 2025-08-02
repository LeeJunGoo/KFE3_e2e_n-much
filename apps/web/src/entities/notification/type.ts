export type NotificationListType = 'popover' | 'full';

export interface SubscriptionProps {
  endPoint: string;
  expirationTime: null;
  keys: {
    p256dh: string;
    auth: string;
  };

  //FIXME - 타입 수정
  key: string; // 또는 [key: string]: Json | undefined;
}
