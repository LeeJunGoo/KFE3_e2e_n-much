import Image from 'next/image';
import { Button } from './ui/button';

export const BADGE_VARIANTS = {
  BEST: {
    label: '인기',
    style: 'bg-red-500 text-white'
  },
  URGENT: {
    label: '마감임박',
    style: 'bg-yellow-500 text-white'
  }
} as const;

export type BadgeKey = keyof typeof BADGE_VARIANTS;

export interface BadgeProps {
  title: BadgeKey;
  className?: string;
}

const Badge = ({ title, className = '' }: BadgeProps) => {
  const { label, style } = BADGE_VARIANTS[title];
  return (
    <>
      <Image
        src={'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg'}
        width={500}
        height={500}
        alt="test"
      />
      <span className={`px-3 py-1 rounded-full text-sm bg-red-500 ${style} ${className}`}>{label}</span>
      <div className="flex flex-wrap items-center gap-2 md:flex-row">
        <Button>Button</Button>
      </div>
    </>
  );
};

export default Badge;
