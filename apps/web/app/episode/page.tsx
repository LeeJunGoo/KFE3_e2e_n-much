import EpisodesForm from '@repo/ui/components/episodes/EpisodesForm';

const EpisodePage = async ({ searchParams }: { searchParams: Promise<{ auction_id: string }> }) => {
  const { auction_id } = await searchParams;

  return (
    <main>
      <EpisodesForm auction_id={auction_id} />
    </main>
  );
};

export default EpisodePage;
