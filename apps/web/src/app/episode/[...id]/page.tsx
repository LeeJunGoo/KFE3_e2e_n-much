import EpisodesForm from '../../../../components/episodes/EpisodesForm';
import { EpisodesListType } from '../../../../types/episodes/index';
import { notFound } from 'next/navigation';

const EpisodePage = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  const [auction_id, episode_id] = (await params).id;
  let initialData: EpisodesListType | null = null;

  if (episode_id) {
    try {
      const res = await fetch(`http://localhost:3001/api/episodes?episode_id=${episode_id}`);

      if (!res.ok) {
        if (res.status === 404) return notFound();
        throw new Error('네트워트 통신 에러가 발생했습니다.' + res.status);
      }

      initialData = await res.json();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error('DB 에러가 발생했습니다.:' + error);
      }
    }
  }

  return (
    <main>
      <EpisodesForm auction_id={auction_id!} initialData={initialData?.data} />
    </main>
  );
};

export default EpisodePage;
