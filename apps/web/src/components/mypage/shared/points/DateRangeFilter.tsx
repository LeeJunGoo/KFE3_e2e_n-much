import { Button } from '@repo/ui/components/ui/button';
import ListCard from 'src/components/common/ui/ListCard';

const DateRangeFilter = () => {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-medium">기간별 필터</h3>
        <Button variant="text" size="sm" className="text-(--color-accent)">
          초기화
        </Button>
      </div>
      <ListCard as="ul" className="flex h-auto w-full items-center justify-center space-x-1 p-2">
        <li className="w-1/4">
          <Button variant="active" className="w-full text-xs">
            전체
          </Button>
        </li>
        <li className="w-1/4">
          <Button variant="inActive" className="w-full text-xs">
            1개월
          </Button>
        </li>
        <li className="w-1/4">
          <Button variant="inActive" className="w-full text-xs">
            3개월
          </Button>
        </li>
        <li className="w-1/4">
          <Button variant="inActive" className="w-full text-xs">
            6개월
          </Button>
        </li>
      </ListCard>
    </div>
  );
};

export default DateRangeFilter;
