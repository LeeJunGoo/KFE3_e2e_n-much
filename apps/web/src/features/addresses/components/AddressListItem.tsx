import { Button } from '@repo/ui/components/ui/button';
import { FaLocationDot } from 'react-icons/fa6';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseCard from 'src/widgets/BaseCard';

const AddressListItem = () => {
  return (
    <>
      <li>
        <BaseCard variant="custom" className="flex w-full items-center gap-4 px-4 pb-6 pt-4 sm:!items-start">
          <BaseAvatar src="/" alt="/" size="md" className="shrink-0 translate-y-2" />
          <div className="w-full">
            <div className="flex flex-col-reverse justify-between sm:flex-row">
              <div className="flex items-center gap-2">
                <h3 className="text-(--color-text-base)">안주원제과점</h3>
                <Button variant="active" className="pointer-events-none h-auto rounded-sm px-2 py-1 text-xs">
                  기본주소
                </Button>
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
            <p className="text-(--color-warm-gray) flex flex-col gap-1 text-sm sm:flex-row">
              <span className="mt-1 flex items-center gap-0.5 sm:mt-0">
                <FaLocationDot size={16} />
                [30808]
              </span>
              <span>서울특별시 서대문구 123-12</span>
            </p>
          </div>
        </BaseCard>
      </li>
      <li>
        <BaseCard variant="custom" className="flex w-full items-center gap-4 px-4 pb-6 pt-4 sm:!items-start">
          <BaseAvatar src="/" alt="/" size="md" className="shrink-0 translate-y-2" />
          <div className="w-full">
            <div className="flex flex-col-reverse justify-between sm:flex-row">
              <div className="flex items-center gap-2">
                <h3 className="text-(--color-text-base)">안주원제과점</h3>
                <Button variant="inActive" className="h-auto rounded-sm px-2 py-1 text-xs">
                  기본주소로 설정
                </Button>
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
            <p className="text-(--color-warm-gray) flex flex-col gap-1 text-sm sm:flex-row">
              <span className="mt-1 flex items-center gap-0.5 sm:mt-0">
                <FaLocationDot size={16} />
                [30808]
              </span>
              <span>서울특별시 서대문구 123-12</span>
            </p>
          </div>
        </BaseCard>
      </li>
    </>
  );
};

export default AddressListItem;
