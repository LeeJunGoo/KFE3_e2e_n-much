import { Database } from '../supabase';

//supabase type
export type EpisodeRow = Database['public']['Tables']['episodes']['Row'];
export type EpisodeInsert = Database['public']['Tables']['episodes']['Insert'];
export type EpisodeUpdate = Database['public']['Tables']['episodes']['Update'];

export type EpisodeItemProps = EpisodeRow & {
  user: {
    user_id: string;
    nickname: string;
    avatar: string | null;
  };
};
export type EpisodesListType = {
  status: string;
  data: {
    episode: EpisodeItemProps[];
    count: number;
  };
};
