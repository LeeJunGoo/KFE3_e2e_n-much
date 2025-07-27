import { Button } from '@repo/ui/components/ui/button';
import { IoIosArrowDown } from 'react-icons/io';
import AuctionSummaryCard from 'src/features/episode/card/AuctionSummaryCard';
import BaseCard from 'src/widgets/BaseCard';

const InquiryListItem = () => {
  return (
    <li>
      <BaseCard variant="default" className="flex w-full items-center gap-4 sm:!items-start">
        <div className="w-full">
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="text-(--color-text-base)">문의드립니다...</h3>
            </div>
            <div className="mb-2 ml-auto flex items-center gap-2">
              <Button variant="text" className="text-(--color-text-base) hover:text-(--color-accent) p-0">
                수정
              </Button>
              <Button variant="text" className="text-(--color-text-base) hover:text-(--color-accent) p-0">
                삭제
              </Button>
            </div>
          </div>
          <div className="text-sm">
            <p className="text-(--color-warm-gray)">
              안녕하세요 안녕하세요 내용입니다 내용이예요! 안녕하세요 안녕하세요 내용입니다 내용이....
            </p>
            <Button variant="text" className="inline-flex items-center justify-start !px-0 !py-0">
              <span>더보기</span>
              <IoIosArrowDown />
            </Button>
          </div>
          <div className="bg-(--color-secondary) mt-2 rounded-lg p-3">
            {/** 업체 정보 클릭 시 auction-detail 페이지로 이동 */}
            {/* <AuctionSummaryCard auctionInfo={auctionInfo} /> */}
          </div>
        </div>
      </BaseCard>
    </li>
  );
};

export default InquiryListItem;
