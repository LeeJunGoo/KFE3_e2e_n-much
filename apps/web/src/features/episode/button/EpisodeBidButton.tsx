import { Button } from '@repo/ui/components/ui/button';
import { FaGavel } from 'react-icons/fa6';

type Variant = 'ghost' | 'outline' | 'destructive' | 'base' | 'secondary' | 'active' | 'inActive' | 'text';

type EpisodeBidButtonProps = {
  onClick: () => void;
  variant: Variant;
  className?: string;
};

const EpisodeBidButton = ({ onClick, variant, className }: EpisodeBidButtonProps) => {
  return (
    <Button size="sm" variant={variant} onClick={onClick} className={className}>
      <FaGavel />
      <span>사연 입찰</span>
    </Button>
  );
};

export default EpisodeBidButton;
