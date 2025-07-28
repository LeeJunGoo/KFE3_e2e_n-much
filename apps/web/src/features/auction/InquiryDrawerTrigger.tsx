'use client';

import React, { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import InquiryDrawer from 'src/features/inquiries/components/InquiryDrawer';

const InquiryDrawerTrigger = ({ actionId }: { actionId: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <InquiryDrawer open={open} setOpen={setOpen} actionId={actionId} />}
      <div
        onClick={() => setOpen(true)}
        className="text-(--color-warm-gray) hover:text-(--color-accent) text-lg font-semibold transition-colors"
      >
        <BiDotsHorizontalRounded />
      </div>
    </>
  );
};

export default InquiryDrawerTrigger;
