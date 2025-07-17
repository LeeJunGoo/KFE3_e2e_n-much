import BaseAvatar from 'src/shared/ui/BaseAvatar';
import BaseBadge from 'src/shared/ui/BaseBadge';
import BaseCard from 'src/widgets/BaseCard';

const AddressListItem = () => {
  return (
    <li>
      <BaseCard>
        <div className="flex items-start gap-2">
          <BaseAvatar src="/" alt="/" size="md" className="shrink-0" />
          <div className="-translate-y-1">
            <p className="mb-1 flex items-center gap-2">
              <span className="text-(--color-text-base)">안주원제과점</span>
              <BaseBadge variant="success">기본주소</BaseBadge>
            </p>
            <p>[30808] 서울특별시 서대문구 123-12</p>
          </div>
        </div>
      </BaseCard>
    </li>
  );
};

export default AddressListItem;
