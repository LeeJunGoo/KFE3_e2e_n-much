import React from 'react';
import { FaBookOpen, FaHeart } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';

type AuctionMetaInfoType = {
  favoritesCount: number;
  episodesCount: number;
  className?: string;
};

const AuctionMetaInfo = ({ favoritesCount, episodesCount, className }: AuctionMetaInfoType) => {
  return (
    <div className={twMerge(`flex items-center gap-3 text-sm`, className)}>
      <i className="flex items-center gap-1 not-italic">
        <FaHeart className="text-(--color-red) mr-1" />
        <span>{favoritesCount}</span>
      </i>
      <i className="flex items-center gap-1 not-italic">
        <FaBookOpen className="text-(--color-primary)" />
        <span>{episodesCount}</span>
      </i>
    </div>
  );
};

export default AuctionMetaInfo;
