import LabelBadge from 'src/components/common/LabelBadge';
import { STATUS_LABELS, STATUS_VARIANTS } from 'src/constants/mypage';
import type { Activity } from 'src/types/mypage';

interface ActivityMetaProps {
  activity: Activity;
}

const ActivityMeta = ({ activity }: ActivityMetaProps) => {
  if (activity.type === 'auction') {
    return <LabelBadge status={STATUS_LABELS[activity.status]} variant={STATUS_VARIANTS[activity.status]} />;
  }

  return (
    <div className="text-right">
      <span className="font-medium text-(--color-accent)">{activity.amount.toLocaleString()}P</span>
    </div>
  );
};

export default ActivityMeta;
