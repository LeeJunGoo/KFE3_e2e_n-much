import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { Button } from '../ui/button';
import { EpisodeRow } from '@repo/ui/types/episodes';
import { notFound, useRouter } from 'next/navigation';

const EditDeleteEpisodes = ({ episode_id }: { episode_id: EpisodeRow['episode_id'] }) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = window.confirm('정말 이 경매를 삭제하시겠습니까?');

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch('http://localhost:3001/api/episodes', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({
          episode_id
        })
      });

      if (!res.ok) {
        if (res.status === 404) return notFound;
        throw new Error('사연을 삭제하는 과정에서 네트워크 오류가 발생했습니다.' + res.status);
      }

      const data = await res.json();

      if ((data.status = 'status')) {
        alert('삭제 되었습니다.');
        window.location.reload();
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`DB 에러 발생: ${error.message}`);
      }
    }
  };
  return (
    <>
      <Button variant="secondary" size="sm" className="gap-1.5">
        <FiEdit />
        수정
      </Button>
      <Button onClick={handleDelete} variant="destructive" size="sm" className="gap-1.5">
        <FiTrash2 />
        삭제
      </Button>
    </>
  );
};

export default EditDeleteEpisodes;
