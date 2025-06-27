import Link from 'next/link';
import type { TabMenuItem } from 'src/types/main';

interface TabNavItemProps {
  item: TabMenuItem;
  isActive?: boolean;
  onClick?: () => void;
}

const TabNavItem = ({ item, isActive = false, onClick }: TabNavItemProps) => {
  const baseClass = 'flex flex-col items-center gap-0.5 py-2 w-full';
  const textColorClass = isActive ? 'text-(--color-accent)' : 'text-(--color-warm-gray)';

  return (
    <li className="flex-1">
      {item.type === 'link' && item.href ? (
        <Link href={item.href} className={`${baseClass} ${textColorClass}`}>
          {item.icon}
          <span className="mt-1 text-xs">{item.label}</span>
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={`${baseClass} ${textColorClass}`}>
          {item.icon}
          <span className="mt-1 text-xs">{item.label}</span>
        </button>
      )}
    </li>
  );
};

export default TabNavItem;
