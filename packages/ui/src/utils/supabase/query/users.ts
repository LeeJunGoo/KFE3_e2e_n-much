import { createClient } from '../client/client';
import type { CreateUserPayload, UserUpdate } from '@repo/ui/types/users';

const supabase = createClient();

export async function getAllUsers() {
  const { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error('DB: 모든 유저 불러오기 에러');
  }
  return users;
}

export async function getUser(user_id: string) {
  const { data: user, error } = await supabase.from('users').select('*').eq('user_id', user_id).maybeSingle();

  if (error) {
    throw new Error('DB: 특정 유저 불러오기 에러');
  }
  return user;
}

export async function addUser(newUserData: CreateUserPayload) {
  const { data: user, error } = await supabase.from('users').insert([newUserData]).select().single();

  if (error) {
    throw new Error('DB: 유저 추가 에러');
  }

  return user;
}

export async function updateUser(user_id: string, updatedData: UserUpdate) {
  const { data: user, error } = await supabase
    .from('users')
    .update(updatedData)
    .eq('user_id', user_id)
    .select()
    .single();

  if (error) {
    console.log(error);
    throw new Error('DB: 유저 수정 에러');
  }

  return user;
}

export async function deleteUser(user_id: string) {
  const { data: user, error } = await supabase.from('users').delete().eq('user_id', user_id).select();

  if (error) {
    console.log(error);
    throw new Error('DB: 유저 삭제 에러');
  }

  return user;
}
