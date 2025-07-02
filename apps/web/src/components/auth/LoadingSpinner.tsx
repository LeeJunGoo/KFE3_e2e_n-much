import { twMerge } from 'tailwind-merge';
import { LuLoaderCircle } from 'react-icons/lu';

type size = 'sm' | 'md' | 'lg' | 'xl';

interface LoadingSpinnerProps {
  size?: size;
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeStyle = {
    sm: 'size-4',
    md: 'size-6',
    lg: 'size-8',
    xl: 'size-10'
  };

  console.log('size value:', size);
  console.log('sizeStyle[size]:', sizeStyle[size]);
  console.log('typeof size:', typeof size);

  return (
    <div className="flex flex-col items-center justify-center">
      <LuLoaderCircle className={twMerge('animate-spin text-(--color-accent)', sizeStyle[size], className)} />
    </div>
  );
}
