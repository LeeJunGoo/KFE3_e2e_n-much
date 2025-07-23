import React from 'react';
import { twMerge } from 'tailwind-merge';

type ContentDescriptionProps = {
  description: string;
  variant?: 'base' | 'ghost' | 'accent' | 'primary';
  className?: string;
  clamp?: number;
};

const variantClasses = {
  base: 'text-(--color-text-base)',
  ghost: 'text-(--color-warm-gray)',
  accent: 'text-(--color-accent)',
  primary: 'text-(--color-primary)'
};

const ContentDescription = ({ description, className, variant = 'base', clamp }: ContentDescriptionProps) => {
  const clampClass = clamp ? `line-clamp-${clamp}` : '';

  return (
    <p
      className={twMerge(
        `${variantClasses[variant]} text-md line-clamp-2 leading-relaxed ${clampClass} white-space: pre-line text-sm`,
        className
      )}
    >
      {description}
    </p>
  );
};

export default ContentDescription;
