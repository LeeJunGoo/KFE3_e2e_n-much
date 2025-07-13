import { twMerge } from 'tailwind-merge';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => {
  return (
    <main className={twMerge('bg-(--color-background) min-h-[calc(100vh-4rem)] px-5 pb-20 pt-8', className)}>
      {children}
    </main>
  );
};

export default PageContainer;
