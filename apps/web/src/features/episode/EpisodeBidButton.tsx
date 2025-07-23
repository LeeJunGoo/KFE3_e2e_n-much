import { Button } from '@repo/ui/components/ui/button';
import { FiAward } from 'react-icons/fi';

type Variant = 'ghost' | 'outline' | 'destructive' | 'base' | 'secondary' | 'active' | 'inActive' | 'text';

type EpisodeBidButtonProps = {
  onClick: () => void;
  variant: Variant;
  className?: string;
};

const EpisodeBidButton = ({ onClick, variant, className }: EpisodeBidButtonProps) => {
  return (
    <Button size="sm" className="bg-[#8E74F9] hover:bg-[#3f3562]" onClick={onClick}>
      <FiAward />
      <span>입찰하기</span>
    </Button>
  );
};

export default EpisodeBidButton;
