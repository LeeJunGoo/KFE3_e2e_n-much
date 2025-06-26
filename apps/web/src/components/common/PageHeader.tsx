import GoBackButton from './GoBackButton';
import PageTitle from './PageTitle';

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="relative border-b border-b-(--color-warm-gray)/30 py-5">
      <GoBackButton />
      <PageTitle>{children}</PageTitle>
    </div>
  );
};

export default PageHeader;
