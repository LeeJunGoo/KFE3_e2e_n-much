import { createClient } from '../client/client';

const supabase = createClient();

export async function getAllUsers() {
  const { data: users, error } = await supabase.from('users').select('*');

  if (error) {
    throw new Error('DB: 모든 유저 불러오기 에러');
  }
  return users;
}

export async function getUser(user_id: string) {
  const { data: user, error } = await supabase.from('users').select('*').eq('user_id', user_id);

  if (error) {
    throw new Error('DB: 특정 유저 불러오기 에러');
  }

  return user;
}

export async function addUser(email: string, password: string, role: 'SELLER' | 'BUYER', nickname: string) {
  const { data: user, error } = await supabase.from('users').insert([{ email, password, role, nickname }]).select();

  if (error) {
    throw new Error('DB: 유저 추가 에러');
  }

  return user;
}

export async function updateUser(user_id: string, nickname: string, avatar: string) {
  const { data: user, error } = await supabase
    .from('users')
    .update({ nickname, avatar })
    .eq('user_id', user_id)
    .select();

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
