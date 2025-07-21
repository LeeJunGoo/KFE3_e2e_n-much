import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const PageTitle = ({ children, className = '', as = 'h2' }: PageTitleProps) => {
  const Component = as;
  return <Component className={(twMerge('text-center text-xl font-bold'), className)}>{children}</Component>;
};

export default PageTitle;
