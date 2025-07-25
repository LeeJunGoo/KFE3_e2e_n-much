import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContentTitleProps = {
  title: string;
  variant: 'base' | 'ghost' | 'accent' | 'primary';
  className?: string;
};

const variantClasses = {
  base: 'text-(--color-text-base)',
  ghost: 'text-(--color-warm-gray)',
  accent: 'text-(--color-accent)',
  primary: 'text-(--color-primary)'
};

const ContentTitle = ({ variant = 'base', title, className }: ContentTitleProps) => {
  return <h3 className={twMerge(`${variantClasses[variant]} font-medium`, className)}>{title}</h3>;
};

export default ContentTitle;
