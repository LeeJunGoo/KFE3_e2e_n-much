'use client';

import { useState } from 'react';
import { MAX_DESCRIPTION_LENGTH } from 'src/entities/inquiry/constants';
// import EpisodeAuctionCard from 'src/features/episode/EpisodeAuctionCard';
import InquiryEditDeleteButton from 'src/features/inquiries/components/InquiryEditDeleteButton';
import InquiryMoreButton from 'src/features/inquiries/components/InquiryMoreButton';
import { truncateText } from 'src/shared/utils/truncateText';
import BaseCard from 'src/widgets/BaseCard';
import type { AuctionSummaryInfoWithAddressType } from 'src/entities/auction/types';
import type { InquiryInfo } from 'src/entities/inquiry/types';

interface InquiryListItemProps {
  inquiryInfo: InquiryInfo;
  auctionInfo: AuctionSummaryInfoWithAddressType;
}

const InquiryListItem = ({ inquiryInfo, auctionInfo }: InquiryListItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { inquiryId, title, description } = inquiryInfo;
  const { auction_id: auctionId } = auctionInfo;

  const { text: trunctedDescription, isTruncated } = truncateText(description, MAX_DESCRIPTION_LENGTH);
  const displayDescription = isExpanded ? description : trunctedDescription;

  const handleMoreClick = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <li>
      <BaseCard variant="default" className="flex w-full items-center gap-4 sm:!items-start">
        <div className="w-full">
          <div className="flex flex-col-reverse justify-between sm:flex-row">
            <div className="flex items-center gap-2">
              <h3 className="text-(--color-text-base)">{title}</h3>
            </div>
            <div className="mb-2 ml-auto flex items-center gap-2">
              <InquiryEditDeleteButton auctionId={auctionId} inquiryId={inquiryId} />
            </div>
          </div>
          <div className="text-sm">
            <p className="text-(--color-warm-gray)">{displayDescription}</p>
            {isTruncated && <InquiryMoreButton handleMoreClick={handleMoreClick} isExpanded={isExpanded} />}
          </div>
          <div className="bg-(--color-secondary) mt-2 rounded-lg p-3">
            {/** 업체 정보 클릭 시 auction-detail 페이지로 이동 */}
            {/* <EpisodeAuctionCard auctionInfo={auctionInfo} /> */}
          </div>
        </div>
      </BaseCard>
    </li>
  );
};

export default InquiryListItem;
