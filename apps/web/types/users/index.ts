import type { Database } from '../supabase';

//supabase type
export type UserRow = Database['public']['Tables']['users']['Row'];
export type UserInsert = Database['public']['Tables']['users']['Insert'];
export type UserUpdate = Database['public']['Tables']['users']['Update'];
export type UserRole = UserInsert['role'];

export type CreateUserPayload = Pick<UserInsert, 'email' | 'password' | 'role' | 'nickname'>;
