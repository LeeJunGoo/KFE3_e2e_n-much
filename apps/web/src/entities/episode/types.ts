import { EpisodeRow } from 'src/shared/supabase/types';

//NOTE - 경매 사연, 등록, 수정 타입 지정
export type EpisodeItemProps = EpisodeRow & {
  buyer: {
    buyer_id: string;
    nickname: string;
    avatar: string | null;
    email: string;
  };
};
export type EpisodesListType = {
  status: string;
  data: {
    episode: EpisodeItemProps[];
    count: number;
  };
};

export type EpisodeInfo = { status: string; data: EpisodeRow };
