import { twMerge } from 'tailwind-merge';
import GoBackButton from 'src/shared/ui/GoBackButton';
import PageTitle from 'src/shared/ui/PageTitle';

interface PageHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const PageHeader = ({ children, className = '' }: PageHeaderProps) => {
  return (
    <div className={twMerge('border-b-(--color-warm-gray)/30 relative border-b py-5', className)}>
      <GoBackButton />
      <PageTitle>{children}</PageTitle>
    </div>
  );
};

export default PageHeader;
