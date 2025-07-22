import { type UserRow } from 'src/shared/supabase/types';

export type SocialAuthProvider = 'google' | 'kakao';

export type UserSummaryInfoType = Pick<UserRow, 'nick_name' | 'user_avatar' | 'email' | 'id'>;
