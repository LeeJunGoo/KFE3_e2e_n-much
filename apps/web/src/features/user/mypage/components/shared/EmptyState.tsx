import { FaFileCircleExclamation } from 'react-icons/fa6';
import PageTitle from 'src/shared/ui/PageTitle';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyState = ({ title, description, icon }: EmptyStateProps) => {
  return (
    <div className="mt-24 flex flex-col items-center gap-3 text-center">
      {icon || <FaFileCircleExclamation className="text-(--color-warm-gray) text-4xl" />}
      <PageTitle as="h3" className="text-lg font-medium">
        {title}
      </PageTitle>
      {description && <p className="text-(--color-warm-gray) text-sm">{description}</p>}
    </div>
  );
};

export default EmptyState;
