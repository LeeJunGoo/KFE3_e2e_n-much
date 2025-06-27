import LabelBadge from 'src/components/common/LabelBadge';
import { BID_STATUS_LABEL, BID_STATUS_VARIANTS } from 'src/constants/mypage';
import type { Activity } from 'src/types/mypage';

type ActivityMetaProps = {
  activity: Activity;
};

const ActivityMeta = ({ activity }: ActivityMetaProps) => {
  if (activity.type === 'auction') {
    return <LabelBadge status={BID_STATUS_LABEL[activity.status]} variant={BID_STATUS_VARIANTS[activity.status]} />;
  }

  return (
    <div className="text-right">
      <span className="font-medium text-(--color-accent)">{activity.amount.toLocaleString()}P</span>
    </div>
  );
};

export default ActivityMeta;
