import EpisodePage from 'src/features/episode/EpisodePage';

const page = async ({ params }: { params: Promise<{ id: string[] }> }) => {
  return (
    <>
      <EpisodePage params={params} />
    </>
  );
};

export default page;
