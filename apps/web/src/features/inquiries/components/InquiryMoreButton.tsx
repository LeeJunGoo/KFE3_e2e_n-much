'use client';

import React from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

const InquiryMoreButton = ({ handleMoreClick, isExpanded }: { handleMoreClick: () => void; isExpanded: boolean }) => {
  return (
    <Button onClick={handleMoreClick} variant="text" className="inline-flex items-center justify-start !px-0 !py-0">
      {isExpanded ? (
        <>
          <span>줄이기</span>
          <IoIosArrowUp />
        </>
      ) : (
        <>
          <span>더보기</span>
          <IoIosArrowDown />
        </>
      )}
    </Button>
  );
};

export default InquiryMoreButton;
