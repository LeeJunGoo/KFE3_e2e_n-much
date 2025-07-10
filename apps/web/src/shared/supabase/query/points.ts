import { createClient } from '../client/client';

const supabase = createClient();

// NOTE - 사용자 포인트 거래 내역 조회
export async function getUserPointTransactions(user_id: string) {
  const { data, error } = await supabase
    .from('points')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('DB: 포인트 거래 내역 조회 에러');
  }

  return data;
}

// NOTE - 포인트 거래 내역 추가
export async function createPointTransaction(
  user_id: string,
  type: string,
  amount: number,
  balance: number,
  title: string,
  description?: string
) {
  const { data, error } = await supabase
    .from('points')
    .insert([
      {
        user_id,
        type,
        amount,
        balance,
        title,
        description
      }
    ])
    .select()
    .single();

  if (error) {
    throw new Error('DB: 포인트 거래 내역 생성 에러');
  }

  return data;
}
