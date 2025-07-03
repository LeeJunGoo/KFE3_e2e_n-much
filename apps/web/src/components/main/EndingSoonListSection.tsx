import { fetchSortedAuctions } from 'src/lib/actions/serverActions';
import EndingSoonCarousel from './EndingSoonCarousel';
import Link from 'next/link';
import PageTitle from '../common/ui/PageTitle';

const EndingSoonListSection = async () => {
  const endingSoonAuctions = await fetchSortedAuctions('end_time', true, 5);

  if (!endingSoonAuctions || endingSoonAuctions.length === 0) {
    return (
      <div className="flex h-50 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-500">
        아직 등록된 정보가 없어요
      </div>
    );
  }

  return (
    <div className="mt-8 px-4">
      <div className="mb-4 flex items-center justify-between">
        <PageTitle>곧 종료되는 경매</PageTitle>
        <Link href="/auctions?order=end_time" className="cursor-pointer text-sm text-(--color-accent)">
          더보기
        </Link>
      </div>
      <EndingSoonCarousel endingSoonAuctions={endingSoonAuctions} />
    </div>
  );
};

export default EndingSoonListSection;
