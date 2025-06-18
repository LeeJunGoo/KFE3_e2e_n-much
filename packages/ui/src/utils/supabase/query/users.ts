import { createClient } from '../client/client';
import type { CreateUserPayload, UserUpdate } from '@repo/ui/types/users';

const supabase = createClient();

export const getAllUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error('DB: 모든 유저 불러오기 에러');
  }
  return data;
};

export const getUser = async (user_id: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('user_id', user_id).maybeSingle();

  if (error) {
    throw new Error('DB: 특정 유저 불러오기 에러');
  }
  return data;
};

export const addUser = async (newUserData: CreateUserPayload) => {
  const { data, error } = await supabase.from('users').insert([newUserData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가 에러');
  }

  return data;
};

export const updateUser = async (user_id: string, updatedData: UserUpdate) => {
  const { data, error } = await supabase.from('users').update(updatedData).eq('user_id', user_id).select().single();

  if (error) {
    console.log(error);
    throw new Error('DB: 유저 수정 에러');
  }

  return data;
};
