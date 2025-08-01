'use client';

import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import { useDeleteAddressInfo } from 'src/entities/addresses/queries/useAddresses';
import ConfirmDialog from 'src/widgets/ConfirmDialog';

const AddressEditDeleteBtn = ({ userId, addressId }: { userId: string | undefined; addressId: string }) => {
  const router = useRouter();

  const deleteAddressMutation = useDeleteAddressInfo();

  const handleEditAddress = async () => {
    router.push(`/mypage/addresses/${addressId}`);
  };

  const handleDeleteAddress = async () => {
    try {
      const status = await deleteAddressMutation.mutateAsync({ addressId, userId });
      if (status === 'success') router.push('/mypage');
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      {/* 
        <Link href="/mypage/addresses" className="text-(--color-accent) flex items-center gap-1">
          <span>주소록 관리</span>
          <FaAngleRight />
        </Link> 
        */}
      <div className="mb-2 ml-auto flex items-center gap-2">
        <Button
          onClick={handleEditAddress}
          variant="text"
          className="text-(--color-text-base) hover:text-(--color-accent) p-0"
        >
          수정
        </Button>
        <ConfirmDialog title="주소 삭제 확인" description="정말로 삭제하시겠습니까?" onConfirm={handleDeleteAddress}>
          <Button variant="text" className="text-(--color-text-base) hover:text-(--color-accent) p-0">
            삭제
          </Button>
        </ConfirmDialog>
      </div>
    </>
  );
};

export default AddressEditDeleteBtn;
