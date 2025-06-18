import { createClient } from '../client/client';

const supabase = createClient();

export async function getAllStories() {
  const { data: stories, error } = await supabase.from('episodes').select('*');

  if (error) {
    console.log(error);
    throw new Error('DB: 모든 사연 불러오기 에러');
  }
  console.log('stories', stories);
  return stories;
}

export async function getStory(story_id: string) {
  const { data: auction, error } = await supabase.from('episodes').select('*').eq('story_id', story_id);

  if (error) {
    throw new Error('DB: 특정 사연 불러오기 에러');
  }

  return auction;
}

export async function addStory(auction_id: string, user_id: string, bid_point: number) {
  const { data: story, error } = await supabase
    .from('episodes')
    .insert([
      {
        auction_id,
        user_id,
        bid_point
      }
    ])
    .select();

  if (error) {
    console.log(error);
    throw new Error('DB: 사연 추가 에러');
  }

  return story;
}

export async function updateStory(story_id: string, winning_bid: boolean) {
  const { data: story, error } = await supabase
    .from('episodes')
    .update({ winning_bid })
    .eq('story_id', story_id)
    .select();

  if (error) {
    throw new Error('DB: 사연 수정 에러');
  }

  return story;
}

export async function deleteStory(story_id: string) {
  const { data: story, error } = await supabase.from('episodes').delete().eq('story_id', story_id).select();

  if (error) {
    throw new Error('DB: 사연 삭제 에러');
  }

  return story;
}
