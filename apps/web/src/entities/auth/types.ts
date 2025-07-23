import type { User } from '@supabase/supabase-js';
import type { UserRow } from 'src/shared/supabase/types';

export type SocialAuthProvider = 'google' | 'kakao';

export type UserRole = 'seller' | 'buyer';

export type ExtendedUser = User & UserRow;
