'use client';
import { Button } from '@repo/ui/components/ui/button';
import { useRouter } from 'next/navigation';
import type { buttonVariants } from '@repo/ui/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

interface BackButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
}

const BackButton = ({ children, variant = 'active', className }: BackButtonProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Button variant={variant} className={className} onClick={handleGoBack}>
      {children}
    </Button>
  );
};

export default BackButton;
