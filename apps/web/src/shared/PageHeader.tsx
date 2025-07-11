<<<<<<<< HEAD:apps/web/src/widgets/PageHeader.tsx
import GoBackButton from './GoBackButton';
import PageTitle from '../shared/ui/PageTitle';
========
import GoBackButton from 'src/shared/GoBackButton';
import PageTitle from 'src/shared/PageTitle';
>>>>>>>> 129a3e62a9dc4842dad9be4f7960e017183f623d:apps/web/src/shared/PageHeader.tsx

interface PageHeaderProps {
  children: React.ReactNode;
}

const PageHeader = ({ children }: PageHeaderProps) => {
  return (
    <div className="border-b-(--color-warm-gray)/30 relative border-b py-5">
      <GoBackButton />
      <PageTitle>{children}</PageTitle>
    </div>
  );
};

export default PageHeader;
