import { EpisodeRow } from 'src/lib/supabase/type';

//NOTE - 경매 사연, 등록, 수정 타입 지정
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

export type EpisodeReturnDataType = {
  status: string;
  data: EpisodeRow;
};
