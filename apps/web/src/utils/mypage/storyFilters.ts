import { TabKey } from 'src/types/mypage';

export interface StoryItem {
  id: number;
  title: string;
  status: string;
  createdAt: string;
  prize: string;
  description: string;
}

export const filterStoryByTab = (stories: StoryItem[], tab: TabKey): StoryItem[] => {
  if (tab === 'ongoing') {
    return stories.filter((story) => story.status === 'bidding' || story.status === 'pending');
  } else {
    return stories.filter(
      (story) => story.status === 'completed' || story.status === 'failed' || story.status === 'ended'
    );
  }
};
