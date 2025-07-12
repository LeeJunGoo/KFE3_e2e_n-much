import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
}

const PageTitle = ({ children, className = '' }: PageTitleProps) => {
  return <h2 className={(twMerge('text-center text-xl font-bold'), className)}>{children}</h2>;
};

export default PageTitle;
