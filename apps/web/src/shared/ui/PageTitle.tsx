import { twMerge } from 'tailwind-merge';

interface PageTitleProps {
  children: React.ReactNode;
  variant?: 'base' | 'ghost' | 'accent' | 'primary';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const PageTitle = ({ children, className = '', as = 'h2', variant = 'base' }: PageTitleProps) => {
  const Component = as;

  const variantClasses = {
    base: 'text-(--color-text-base)',
    ghost: 'text-(--color-warm-gray)',
    accent: 'text-(--color-accent)',
    primary: 'text-(--color-primary)'
  };
  return (
    <Component className={(twMerge(`text-center text-xl font-bold $${variantClasses[variant]}`), className)}>
      {children}
    </Component>
  );
};

export default PageTitle;
