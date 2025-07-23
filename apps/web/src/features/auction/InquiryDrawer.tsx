'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import BottomDrawer from '../search/components/BottomDrawer';

const InquiryDrawer = () => {
  const [open, setOpen] = useState(false);
  const route = useRouter();

  const handleInquiryClick = () => {
    route.push('/inquiries/write');
  };

  return (
    <>
      {open && (
        <>
          <BottomDrawer
            open={open}
            onOpenChange={setOpen}
            title="문의"
            description="문의사항이 있다면 업체에 문의하세요."
          >
            <div className="flex gap-2 p-4">
              <button className="bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary) flex-1 rounded-md p-2 text-center transition-colors">
                채팅
              </button>
              <button
                className="bg-(--color-accent) text-(--color-secondary) hover:bg-(--color-primary) flex-1 rounded-md p-2 text-center transition-colors"
                onClick={handleInquiryClick}
              >
                문의하기
              </button>
            </div>
          </BottomDrawer>
        </>
      )}
      <div
        onClick={() => setOpen(true)}
        className="text-(--color-warm-gray) hover:text-(--color-accent) text-lg font-semibold transition-colors"
      >
        <BiDotsHorizontalRounded />
      </div>
    </>
  );
};

export default InquiryDrawer;
