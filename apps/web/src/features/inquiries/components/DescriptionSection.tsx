'use client';

import React, { useState } from 'react';
import { Button } from '@repo/ui/components/ui/button';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { MAX_DESCRIPTION_LENGTH } from 'src/entities/inquiry/constants';
import { truncateText } from 'src/shared/utils/truncateText';

const DescriptionSection = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { text: trunctedDescription, isTruncated } = truncateText(description, MAX_DESCRIPTION_LENGTH);
  const displayDescription = isExpanded ? description : trunctedDescription;

  const handleMoreClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <p className="text-(--color-warm-gray)">{displayDescription}</p>
      {isTruncated && (
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
      )}
    </>
  );
};

export default DescriptionSection;
