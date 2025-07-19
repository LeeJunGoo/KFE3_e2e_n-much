import React from 'react';
import Image from 'next/image';
import MascotImage from 'src/assets/images/mascot.webp';
import { twMerge } from 'tailwind-merge';

type ContentEmpty = {
  titleLabel: string;
  contentLabel: string;
  className?: string;
};

const ContentEmpty = ({ titleLabel, contentLabel, className }: ContentEmpty) => {
  return (
    <div
      className={twMerge(
        `bg-(--color-background) flex h-52 items-center justify-center gap-4 rounded-lg border shadow-md`,
        className
      )}
    >
      <div className="flex-1/3 flex items-center justify-end">
        <Image src={MascotImage} alt="에러가 발생했습니다." width={65} className="h-auto" />
      </div>
      <div className="flex-2/3 text-(--color-text-base) text-left text-sm leading-relaxed">
        <p className="font-semibold"> {titleLabel}</p>
        <p className="text-gray-500">{contentLabel}</p>
      </div>
    </div>
  );
};

export default ContentEmpty;
