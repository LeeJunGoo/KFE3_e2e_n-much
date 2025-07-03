'use client';

import { Button } from '@repo/ui/components/ui/button';
import { EpisodeRow } from 'src/lib/supabase/type';

import { useRouter } from 'next/navigation';
import { fetchDeleteEpisode } from 'src/lib/queries/episodes';

const EditDeleteEpisodes = ({
  auction_id,
  episode_id
}: {
  auction_id: EpisodeRow['auction_id'];
  episode_id: EpisodeRow['episode_id'];
}) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/episode/${auction_id}/${episode_id}`);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 이 경매를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const result = await fetchDeleteEpisode(episode_id);

      if (result === 'success') {
        alert('삭제 되었습니다.');
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  return (
    <div className="flex space-x-2">
      <Button onClick={handleEdit} variant="text" size="sm" className="-px-3 text-xs text-(--color-light-gray)">
        수정
      </Button>
      <Button onClick={handleDelete} variant="text" size="sm" className="text-xs text-(--color-red)">
        삭제
      </Button>
    </div>
  );
};

export default EditDeleteEpisodes;
