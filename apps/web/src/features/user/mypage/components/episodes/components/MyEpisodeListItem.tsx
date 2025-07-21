import { FaChevronRight, FaGavel } from 'react-icons/fa6';
import { formatYYYYMMDD } from 'src/shared/utils/formatKoreanDate';
import BaseCard from 'src/widgets/BaseCard';

const MyEpisodeListItem = () => {
  return (
    <BaseCard
      as="li"
      className="hover:bg-(--color-accent)/10 group mb-4 flex cursor-pointer transition-colors duration-200"
    >
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium">스토리제목</h3>
          {/* <Badge variant={getVariant(status)}>{getStatusText(status)}</Badge> */}
          진행중
        </div>
        <p className="text-(--color-warm-gray) text-sm">작성일: {formatYYYYMMDD('2025-05-05')}</p>
        <div className="bg-(--color-secondary) group-hover:bg-(--color-accent)/30 mt-2 rounded-lg p-3 transition-colors duration-200">
          <p className="text-(--color-accent) flex items-center gap-2 text-sm transition-all duration-200 group-hover:text-white">
            <FaGavel />
            <span>경매타이틀</span>
          </p>
        </div>
      </div>
      <FaChevronRight className="text-(--color-warm-gray) ml-3 mt-1" />
    </BaseCard>
  );
};

export default MyEpisodeListItem;
