import { EpisodeRow } from 'types/episodes';
import type { Database } from '../supabase';
import { AuctionRow } from 'types/auctions';

//supabase type
export type UserRow = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
export type UserRole = UserInsert['role'];

export type CreateUserPayload = Pick<UserInsert, 'email' | 'password' | 'role' | 'nickname'>;

//FIXME - 수정 필요
export type EpisodeWithDetails = EpisodeRow & {
  users: Pick<UserRow, 'nickname' | 'avatar'>;
  auctions: Pick<AuctionRow, 'title'>;
};
