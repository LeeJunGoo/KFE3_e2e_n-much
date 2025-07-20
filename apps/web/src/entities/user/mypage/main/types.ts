import type { User } from '@supabase/supabase-js';

export type UserMetadata = {
  data: User['user_metadata'];
};

export type RoleType = 'buyer' | 'seller';
