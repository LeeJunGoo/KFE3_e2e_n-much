import GoBackButton from './GoBackButton';
import PageTitle from './PageTitle';

interface PageHeaderProps {
  title: string;
}

const PageHeader = ({ title }: PageHeaderProps) => {
  return (
    <div className="relative border-b border-b-(--color-warm-gray)/30 py-5">
      <GoBackButton />
      <PageTitle>{title}</PageTitle>
    </div>
  );
};

export default PageHeader;
