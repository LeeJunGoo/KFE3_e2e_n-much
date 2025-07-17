import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { FaAngleRight, FaLocationDot } from 'react-icons/fa6';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';

const AddressStatus = () => {
  return (
    <>
      {/** 기본배송지 있음 */}
      <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
        <div className="flex items-start justify-between">
          <h3 className="text-(--color-text-base) mb-3 text-base font-semibold">주소</h3>
          <Link href="/mypage/addresses" className="text-(--color-accent) flex items-center gap-1">
            <span>주소록 관리</span>
            <FaAngleRight />
          </Link>
        </div>
        <div className="flex items-start gap-2">
          <BaseAvatar src="/" alt="/" size="md" className="shrink-0" />
          <div className="-translate-y-1">
            <div className="mb-1 flex items-center gap-2">
              <h4 className="text-(--color-text-base)">안주원제과점</h4>
              <BaseBadge variant="success">매장주소</BaseBadge>
            </div>
            <p className="flex flex-col gap-1 sm:flex-row sm:items-center">
              <span className="flex items-center gap-1">
                <FaLocationDot size={16} />
                [30808]
              </span>
              <span>서울특별시 서대문구 123-12</span>
            </p>
          </div>
        </div>
      </div>

      {/** 기본배송지 없을 경우 */}
      <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
        <h3 className="text-(--color-text-base) mb-3 text-base font-semibold">주소</h3>
        <p>주소가 등록되지 않았습니다. 주소를 입력해 주세요.</p>
        <Link href="/mypage/addresses/write" className="text-(--color-accent) mt-3 inline-flex items-center gap-1">
          <Button variant="base" size="sm" className="min-w-30">
            등록하기
            <FaAngleRight />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AddressStatus;
