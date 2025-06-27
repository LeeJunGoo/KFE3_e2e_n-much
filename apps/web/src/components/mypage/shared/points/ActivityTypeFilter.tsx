import { FaCoins, FaCartShopping } from 'react-icons/fa6';
import { MdFormatListBulleted } from 'react-icons/md';
import { Button } from '@repo/ui/components/ui/button';
import SectionHeader from 'src/components/common/ui/SectionHeader';

const ActivityTypeFilter = () => {
  return (
    <div className="mt-6">
      <SectionHeader className="mb-3">유형별 필터</SectionHeader>
      <ul className="flex items-center gap-2">
        <li>
          <Button variant="active" size="sm" className="text-xs">
            <MdFormatListBulleted />
            <span>전체</span>
          </Button>
        </li>
        <li>
          <Button variant="inActive" size="sm" className="text-xs">
            <FaCoins className="size-3" />
            <span>충전</span>
          </Button>
        </li>
        <li className="">
          <Button variant="inActive" size="sm" className="text-xs">
            <FaCartShopping className="size-3" />
            사용
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default ActivityTypeFilter;
