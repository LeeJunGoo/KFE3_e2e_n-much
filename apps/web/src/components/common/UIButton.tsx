import { Button } from '@repo/ui/components/ui/button';
import React from 'react';

type UIButtonProps = Omit<React.ComponentProps<typeof Button>, 'variant'> & {
  variant?: keyof typeof BUTTON_STYLES;
};

const BUTTON_STYLES = {
  base: 'rounded-lg bg-(--color-primary) text-white px-4 py-2 text-sm font-medium transition-colors duration-200 hover:bg-(--color-accent)',
  filterActive:
    'rounded-md px-3 py-1.5 text-xs whitespace-nowrap border border-(--color-accent) bg-(--color-accent) text-white',
  filterInactive:
    'rounded-md px-3 py-1.5 text-xs whitespace-nowrap border text-(--color-accent) hover:border-transparent hover:bg-(--color-primary) hover:text-white'
} as const;

const UIButton = ({ className = '', variant, ...props }: UIButtonProps) => {
  const variantClass = variant ? BUTTON_STYLES[variant] : BUTTON_STYLES.base;
  return <Button className={`${variantClass} ${className}`} {...props} />;
};

export default UIButton;
