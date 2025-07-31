'use client';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaAngleRight, FaLocationDot } from 'react-icons/fa6';
import { useGetDefaultAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import { useUserState } from 'src/entities/auth/stores/useAuthStore';
import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';
import ConfirmDialog from 'src/widgets/ConfirmDialog';

const AddressStatus = () => {
  const user = useUserState();
  const userId = user?.id;

  const router = useRouter();

  const { data, isPending, isError } = useGetDefaultAddressInfo(userId);
  const addressId = data?.address_id;

  if (!userId) return null;

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러!</div>;

  if (!data) {
    return (
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
    );
  }

  // 기본배송지 "있음"
  return (
    <div className="text-(--color-warm-gray) border-(--color-warm-gray)/30 mt-3 border-t py-4 text-sm">
      <div className="flex items-start justify-between">
        <h3 className="text-(--color-text-base) mb-3 text-base font-semibold">주소</h3>
        {/* 
        <Link href="/mypage/addresses" className="text-(--color-accent) flex items-center gap-1">
          <span>주소록 관리</span>
          <FaAngleRight />
        </Link> 
        */}
        <div className="mb-2 ml-auto flex items-center gap-2">
          {/* <Link href="/mypage/addresses/write"" className="text-(--color-text-base) hover:text-(--color-accent)">
            <span>수정</span>
          </Link> */}
          <Button
            onClick={() => {
              router.push(`/mypage/addresses/${addressId}`);
            }}
            variant="text"
            className="text-(--color-text-base) hover:text-(--color-accent) p-0"
          >
            수정
          </Button>
          <ConfirmDialog
            title="주소 삭제 확인"
            description="정말로 삭제하시겠습니까?"
            onConfirm={() => {
              // console.log('삭제');
            }}
          >
            <Button variant="text" className="text-(--color-text-base) hover:text-(--color-accent) p-0">
              삭제
            </Button>
          </ConfirmDialog>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <BaseAvatar src={data.company_image ?? '/'} alt={data.business_name ?? '매장'} size="md" className="shrink-0" />
        <div className="-translate-y-1">
          <div className="mb-1 flex items-center gap-2">
            <h4 className="text-(--color-text-base)">{data.business_name || '이름 없음'}</h4>
            <BaseBadge variant="accent">매장주소</BaseBadge>
          </div>
          <p className="flex flex-col gap-1 sm:flex-row sm:items-center">
            <span className="flex items-center gap-1">
              <FaLocationDot size={16} />[{data.postal_code || '-'}]
            </span>
            <span>
              {data.road_address}
              {data.detail_address && ` ${data.detail_address}`}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddressStatus;
