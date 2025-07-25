import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContentTitleProps = {
  title: string;
  className?: string;
};

const ContentTitle = ({ variant = 'base', title, className }: ContentTitleProps) => {
  return <h3 className={twMerge(`${variantClasses[variant]} font-medium`, className)}>{title}</h3>;
};

export default ContentTitle;
