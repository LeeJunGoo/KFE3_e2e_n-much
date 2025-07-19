import EpisodePage from 'src/features/episode/EpisodePage';

const Episode = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  return (
    <>
      <EpisodePage params={params} />
    </>
  );
};

export default Episode;
