import { createClient } from 'src/shared/supabase/client/client';
import type { UserRow } from 'src/shared/supabase/types';

const supabase = createClient();

export const selectEpisodesByUserId = async (userId: UserRow['id']) => {
  const { data: episodes, error } = await supabase
    .from('episodes')
    .select(
      `
      *,
      auctions:auction_id (
        title,
        status
      )
    `
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('🚀 ~ selectEpisodesByUserId ~ error:', error);
    throw new Error('DB: 사용자 에피소드 목록 조회 에러');
  }

  return episodes ?? [];
};
