// import type { EpisodeRow } from 'src/shared/supabase/types';
import type { EpisodeInsert, EpisodeRow, EpisodeUpdate } from 'src/shared/supabase/types/index';

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

//ANCHOR - 사연 등록
export type EpisodeCreateType = {
  auctionId: EpisodeInsert['auction_id'];
  userId: EpisodeInsert['user_id'];
  title: EpisodeInsert['title'];
  description: EpisodeInsert['description'];
};

//NOTE - 사연 수정
export type EpisodeEditType = {
  episodeId: EpisodeUpdate['episode_id'];
  title: EpisodeUpdate['title'];
  description: EpisodeUpdate['description'];
};
