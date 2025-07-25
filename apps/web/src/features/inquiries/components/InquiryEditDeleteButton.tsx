'use client';

import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { toast } from '@repo/ui/components/ui/sonner';
import { useRouter } from 'next/navigation';
import { deleteInquiryInfo } from 'src/entities/inquiry/api';
import ConfirmDialog from 'src/widgets/ConfirmDialog';
import type { AuctionRow, InquiryRow } from 'src/shared/supabase/types';

interface InquiryEditDeleteButtonProps {
  auctionId: AuctionRow['auction_id'];
  inquiryId: InquiryRow['inquiry_id'];
}

const InquiryEditDeleteButton = ({ auctionId, inquiryId }: InquiryEditDeleteButtonProps) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/inquiries/${auctionId}/${inquiryId}`);
  };
  const handleDeleteClick = async () => {
    try {
      await deleteInquiryInfo(inquiryId);
      toast.success('문의를 삭제했습니다.');
      router.refresh();
    } catch (error) {
      toast.error('문의를 삭제하지 못했습니다.');
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleEditClick}
        variant="text"
        className="text-(--color-text-base) hover:text-(--color-accent) p-0"
      >
        수정
      </Button>
      <ConfirmDialog title="문의 삭제 확인" description="정말로 삭제하시겠습니까?" onConfirm={handleDeleteClick}>
        <Button variant="text" className="text-(--color-text-base) hover:text-(--color-accent) p-0">
          삭제
        </Button>
      </ConfirmDialog>
    </>
  );
};

export default InquiryEditDeleteButton;
