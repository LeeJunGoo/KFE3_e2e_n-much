import { createClient } from 'src/shared/supabase/client/client';
import type { SubscriptionProps } from 'src/entities/notification/type';
import type { Json } from 'src/shared/supabase/types/supabase';

const supabase = createClient();

//ANCHOR - 사용자 구독 불러오기
export const selectUserSubscription = async (userId: string) => {
  const { data, error } = await supabase.from('users').select('subscription').eq('user_id', userId).single();

  if (error) {
    console.error('🚀 ~ selectUserSubscription ~ error:', error);
    throw new Error();
  }

  return data;
};

//ANCHOR - 사용자 구독 업데이트
export const UpdateUserSubscription = async (userId: string, subscription: SubscriptionProps) => {
  const { data, error } = await supabase
    .from('users')
    .update({ subscription: subscription as unknown as Json })
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error('🚀 ~ selectUserSubscription ~ error:', error);
    throw new Error();
  }

  return data;
};
