import { FaGavel } from 'react-icons/fa6';
import BaseBadge from 'src/shared/ui/BaseBadge';
import BaseCard from 'src/widgets/BaseCard';

interface MyEpisodeListItemProps {
  episodeTitle: string;
  auctionTitle: string;
  episodeDate: string;
  episodeStatus: boolean | null;
}

const MyEpisodeListItem = ({ episodeTitle, auctionTitle, episodeDate, episodeStatus }: MyEpisodeListItemProps) => {
  return (
    <BaseCard
      as="li"
      className="hover:bg-(--color-accent)/10 group mb-4 flex cursor-pointer transition-colors duration-200"
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">{episodeTitle}</h3>
          <BaseBadge variant={episodeStatus !== null ? 'red' : 'accent'}>
            {episodeStatus !== null ? '마감' : '진행중'}
          </BaseBadge>
        </div>
        <p className="text-(--color-warm-gray) text-sm">작성일: {episodeDate}</p>
        <div className="bg-(--color-secondary) group-hover:bg-(--color-accent)/30 mt-2 rounded-lg p-3 transition-colors duration-200">
          <p className="text-(--color-accent) flex items-center gap-2 text-sm transition-all duration-200 group-hover:text-white">
            <FaGavel />
            <span>{auctionTitle}</span>
          </p>
        </div>
      </div>
    </BaseCard>
  );
};

export default MyEpisodeListItem;
